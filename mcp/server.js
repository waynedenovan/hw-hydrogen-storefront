#!/usr/bin/env node
const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { CallToolRequestSchema, ListToolsRequestSchema, ErrorCode, McpError } = require('@modelcontextprotocol/sdk/types.js');
const path = require('path');

// Logic is now strictly local to the mcp/ folder
const errorParser = require('./error-parser/index.js');

async function main() {
    const server = new Server({
        name: 'error-resolution',
        version: '2.0.0',
    }, {
        capabilities: { tools: {} },
    });

    // Initialize blank workspace based on CWD
    errorParser.initialize()
        .then(status => console.error(`[database] ✅ ${status.message}`))
        .catch(err => console.error(`[database] ❌ Initialization failed: ${err.message}`));

    server.setRequestHandler(ListToolsRequestSchema, async () => ({
        tools: [
            {
                name: 'search_errors',
                description: 'Search the blank error knowledge base for this project.',
                inputSchema: {
                    type: 'object',
                    properties: { query: { type: 'string' } },
                    required: ['query'],
                },
            }
        ],
    }));

    server.setRequestHandler(CallToolRequestSchema, async (request) => {
        const { name, arguments: args } = request.params;
        if (name === 'search_errors') {
            const results = await errorParser.searchErrors(args.query);
            return { content: [{ type: 'text', text: JSON.stringify(results, null, 2) }] };
        }
        throw new McpError(ErrorCode.MethodNotFound, `Tool "${name}" not found`);
    });

    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main().catch((err) => {
    console.error('[error-resolution] Fatal error:', err);
    process.exit(1);
});
