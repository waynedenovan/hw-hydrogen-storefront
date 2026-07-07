import express from "express";
import { spawn } from "child_process";
import path from "path";
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 4000;
let activeClients = new Set();

const SERVERS = [
    {
        name: "Legacy-Error",
        cmd: "/home/rogue/.nvm/versions/node/v25.2.1/bin/node",
        args: ["/home/rogue/Data/data/coding/github/shopify/260513-dev/mcp/server.js"],
        cwd: "/home/rogue/Data/data/coding/github/shopify/260513-dev"
    },
    {
        name: "Qdrant-Search",
        cmd: "/home/rogue/Data/data/coding/github/index/minilm/bin/mcp-server-qdrant",
        args: [],
        cwd: "/home/rogue/Data/data/coding/github/index",
        env: {
            ...process.env,
            QDRANT_URL: "http://localhost:6333",
            COLLECTION_NAME: "ws-260513-dev",
            EMBEDDING_MODEL: "sentence-transformers/all-MiniLM-L6-v2",
            EMBEDDING_PROVIDER: "fastembed"
        }
    }
];

let processes = {};
let pendingRequests = new Map();
const toolRegistry = new Map();

const broadcast = (data) => {
    activeClients.forEach(client => {
        client.write(`event: message\ndata: ${data}\n\n`);
    });
};

const handleResponse = (serverName, msg) => {
    const id = msg.id;
    if (pendingRequests.has(id)) {
        const req = pendingRequests.get(id);
        req.responses.set(serverName, msg);

        if (msg.result?.tools) {
            msg.result.tools.forEach(tool => {
                toolRegistry.set(tool.name, serverName);
                console.error(`[Bridge] 📋 Registered tool "${tool.name}" → ${serverName}`);
            });
        }

        if (req.responses.size === req.expectedCount) {
            const merged = mergeResponses(req.responses, id);
            broadcast(JSON.stringify(merged));
            pendingRequests.delete(id);
        }
    } else {
        console.error(`[Bridge] ⚠️ Ignoring untracked response id: ${id} from ${serverName}`);
    }
};

const mergeResponses = (responses, id) => {
    let finalResult = {
        jsonrpc: "2.0",
        id,
        result: {
            protocolVersion: "2024-11-05",
            capabilities: {},
            serverInfo: { name: "Shopify-Dev-Bridge", version: "1.0.0" }
        }
    };

    let tools = [];
    let resources = [];
    let prompts = [];
    let content = [];

    for (const [name, msg] of responses) {
        if (msg.error) continue;
        const res = msg.result;
        if (!res) continue;

        if (res.capabilities) {
            if (res.capabilities.tools) finalResult.result.capabilities.tools = { listChanged: true };
            if (res.capabilities.resources) finalResult.result.capabilities.resources = { subscribe: true };
            if (res.capabilities.prompts) finalResult.result.capabilities.prompts = { listChanged: true };
        }

        if (res.tools) tools.push(...res.tools);
        if (res.resources) resources.push(...res.resources);
        if (res.prompts) prompts.push(...res.prompts);
        if (res.content) content.push(...res.content);
        if (res.protocolVersion) finalResult.result.protocolVersion = res.protocolVersion;
    }

    if (tools.length) finalResult.result.tools = tools;
    if (resources.length) finalResult.result.resources = resources;
    if (prompts.length) finalResult.result.prompts = prompts;
    if (content.length) finalResult.result.content = content;

    return finalResult;
};

const startServer = (config) => {
    console.error(`[Bridge] 🚀 Starting ${config.name}...`);
    const child = spawn(config.cmd, config.args, {
        cwd: config.cwd,
        env: config.env || process.env,
        stdio: ['pipe', 'pipe', 'pipe']
    });

    const initId = `init-${config.name}`;
    const listId = `list-tools-${config.name}`;

    child.stdout.on('data', (data) => {
        data.toString().split('\n').forEach(line => {
            const trimmed = line.trim();
            if (!trimmed.startsWith('{')) {
                if (trimmed) console.error(`[${config.name} Log]: ${trimmed}`);
                return;
            }

            try {
                const msg = JSON.parse(trimmed);
                if (msg.id !== undefined && (msg.result || msg.error)) {
                    if (msg.id === initId && msg.result) {
                        console.error(`[Bridge] ✅ ${config.name} initialized`);
                        child.stdin.write(JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) + '\n');
                        pendingRequests.set(listId, { responses: new Map(), startTime: Date.now(), expectedCount: 1 });
                        child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id: listId, method: "tools/list", params: {} }) + '\n');
                        return;
                    }
                    handleResponse(config.name, msg);
                } else {
                    broadcast(trimmed);
                }
            } catch (e) {}
        });
    });

    child.stderr.on('data', (data) => console.error(`[${config.name}]: ${data.toString().trim()}`));

    child.on('close', (code) => {
        console.error(`[Bridge] 💀 ${config.name} exited (${code}). Respawning in 5s...`);
        setTimeout(() => startServer(config), 5000);
    });

    processes[config.name] = child;

    child.stdin.write(JSON.stringify({
        jsonrpc: "2.0",
        id: initId,
        method: "initialize",
        params: {
            capabilities: {},
            clientInfo: { name: "Shopify-Dev-Bridge", version: "1.0.0" },
            protocolVersion: "2024-11-05"
        }
    }) + '\n');
};

const forwardToAll = (msg) => {
    const id = msg.id;
    if (id !== undefined) {
        pendingRequests.set(id, { responses: new Map(), startTime: Date.now(), expectedCount: SERVERS.length });

        setTimeout(() => {
            if (pendingRequests.has(id)) {
                console.error(`[Bridge] ⏱️ Merging timeout for id: ${id}. Sending partial result.`);
                const req = pendingRequests.get(id);
                const merged = mergeResponses(req.responses, id);
                broadcast(JSON.stringify(merged));
                pendingRequests.delete(id);
            }
        }, 25000);
    }

    const line = JSON.stringify(msg) + '\n';
    Object.values(processes).forEach(child => {
        if (child.stdin.writable) child.stdin.write(line);
    });
};

const forwardToServer = (serverName, msg) => {
    const id = msg.id;
    if (id !== undefined) {
        pendingRequests.set(id, { responses: new Map(), startTime: Date.now(), expectedCount: 1 });

        setTimeout(() => {
            if (pendingRequests.has(id)) {
                console.error(`[Bridge] ⏱️ Timeout for id: ${id}.`);
                const req = pendingRequests.get(id);
                const merged = mergeResponses(req.responses, id);
                broadcast(JSON.stringify(merged));
                pendingRequests.delete(id);
            }
        }, 25000);
    }

    const child = processes[serverName];
    if (child && child.stdin.writable) {
        child.stdin.write(JSON.stringify(msg) + '\n');
    } else {
        console.error(`[Bridge] ⚠️ Server "${serverName}" not available, falling back to broadcast`);
        forwardToAll(msg);
    }
};

const routeMessage = (msg) => {
    if (msg.method === 'tools/call' && msg.params?.name) {
        const serverName = toolRegistry.get(msg.params.name);
        if (serverName) {
            console.error(`[Bridge] 🎯 Routing tools/call "${msg.params.name}" → ${serverName}`);
            forwardToServer(serverName, msg);
            return;
        }
        console.error(`[Bridge] ⚠️ Tool "${msg.params.name}" not in registry, broadcasting to all`);
    }
    forwardToAll(msg);
};

SERVERS.forEach(startServer);

app.use(express.json());

// Claude Code SSE Handshake
app.get("/sse", (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Link': '</messages>; rel="mcp:connection"'
    });
    res.write(`event: endpoint\ndata: /messages\n\n`);
    res.flushHeaders();
    activeClients.add(res);
    req.on('close', () => activeClients.delete(res));
});

// Tool Routing & Connection Intercept
app.post("/messages", (req, res) => {
    const msg = req.body;

    if (msg.method === "initialize") {
        const response = JSON.stringify({
            jsonrpc: "2.0",
            id: msg.id,
            result: {
                protocolVersion: "2024-11-05",
                capabilities: { tools: {}, resources: {}, prompts: {} },
                serverInfo: { name: "Shopify-Dev-Bridge", version: "1.0.0" }
            }
        });
        broadcast(response);
        return res.status(200).json({ status: "intercepted" });
    }

    routeMessage(msg);
    res.status(202).send("Accepted");
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ [Bridge] Active on port ${PORT}`);
});