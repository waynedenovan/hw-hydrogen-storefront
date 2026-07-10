An HTTP POST request to /app/import.data is taking an astonishing 62.4 seconds to process and return a response.

Because Node.js is single-threaded, if your import.data route handles large payloads (like processing agricultural/Agrinet product catalogs) using synchronous methods—such as massive JSON.parse() operations, large un-awaited forEach loops mapping database items, or heavy synchronous file parsing—it will block the event loop. While the event loop is blocked, Node cannot handle incoming network requests, leading directly to the intermittent network timeouts and multi-second silences you are capturing.
How to Fix It

    Offload the Data Import: Heavy data operations should never happen directly inside an active web request thread. Migrate the /app/import.data execution to an asynchronous background worker or a queue system (like BullMQ, Redis, or simple background worker threads).

    Break Up Synchronous Blocks: If you must parse data inline, break up large arrays into smaller chunks and use setImmediate() or await new Promise(resolve => setImmediate(resolve)) between chunks to allow the Node event loop to breathe and handle waiting network packets.


This complete view of the log file (hw-hydrogen-storefront-node-docker/app/errors/hw-storefront.log) reveals the systematic failure pattern. The network and application crashes are being caused by Request-induced Event Loop Starvation with Upstream Client Retries.

Here is exactly what is happening under the hood:
1. The Core Issue: Heavy Synchronous Blocking

Every single POST /app/import.data request is completely stalling the Node.js application process, taking between 53 and 64 seconds to execute and finish a single response:

    POST /app/import.data -> 63,797 ms (~63.8 seconds)

    POST /app/import.data -> 57,857 ms (~57.8 seconds)

    POST /app/import.data -> 58,333 ms (~58.3 seconds)

    POST /app/import.data -> 63,162 ms (~63.2 seconds)

Because Node.js runs on a single thread, during those ~60 seconds, the main execution thread is completely frozen. It cannot read incoming TCP packets, parse routing data, or handle light traffic.
2. The Cascading Failure: The 60-Second Timeout Loop

Notice how almost all of these massive post times are tightly clustered right around the 60-second mark. This indicates a classic architectural mismatch:

    The Trigger: An admin initiates a large data import via the Shopify admin app panel.

    The Block: Node hits a massive synchronous parsing loop (e.g., handling the catalog sync) and freezes.

    The Upstream Gateway Drops: The client/browser or your reverse proxy network layer (like a Cloudflare Tunnel or Nginx gateway) has a standard 60-second read timeout. When it doesn't get a response in 60 seconds, it implicitly drops the connection on the network layer and considers it a failure.

    The Automatic Retry Storm: Because the front-end or proxy thinks the server failed, it immediately fires another POST request to try again.

    The Death Spiral: The log shows an uninterrupted sequence of overlapping 60-second POST executions. The app container is essentially drowning under stacked, un-yielded CPU-intensive tasks, explaining why the connection drops out completely.

3. Proof from the Log

You can see that light requests are incredibly fast when Node is between imports, but get bottlenecked into blocks:

    GET /app/agrinet.data takes only 2.9 ms to 3.3 ms when it manages to slip through.

    GET /app/import.data takes 273 ms to 297 ms.

The network isn't physically broken; the container is simply unresponsive for full minutes at a time while grinding through data payloads on the single web thread.

ToDo: How to Resolve the Death Spiral

To prevent these long execution blocks from severing your Docker cluster connections, the web request needs to be decoupled from the data processing task:

    Immediate Fire-and-Forget Response:
    Change your /app/import.data handler to immediately return a status code of 202 Accepted along with a quick JSON response ({ success: true, message: "Import started" }). This should take less than 10 milliseconds, satisfying Shopify's bridge timeouts and preventing the browser from retrying.

    Offload the Heavy Lifting:
    Pass the incoming payload off to an asynchronous execution pool so the event loop never locks up. You can accomplish this by either:

        Spawning a child thread using Node's native worker_threads module.

        Pushing the task to a lightweight background processing queue (like BullMQ or an external task runner).