- The Bottleneck:
	- Slow 404 Image Requests (750ms+)If we look closely at your web server logs, there is a massive discrepancy in request processing times:
		- Successful requests (200 OK): Take between 2.3 ms and 8.5 ms.
		- Failed requests (404 Not Found): Take between 350 ms and 775 ms.

	- Plain text:
		GET /media/suppliers/agri/FC3M1500.jpg 404 - - 741.320 ms  <-- Extremely slow!
		GET /media/suppliers/agri/BZ457530.jpg 200 - - 3.921 ms    <-- Fast and normal

		- Why this is a major problem:
			- When a browser loads a product page, it attempts to fetch multiple images in parallel.
			- If several of those images are missing, your server is tying up its request handling threads for nearly a second per missing image.
			- This explains the Cloudflare stream cancellations from your previous logs; the client (or Cloudflare) is timing out and canceling the HTTP streams because your server is taking too long to say "this image does not exist."

	- The Fix:
		- Short-circuit static files:
			- Ensure your web framework (React Router / Express / Nginx) is configured to quickly check the filesystem for static /media/ assets.
			- If a physical file is not present, it should return a raw 404 immediately rather than booting up your entire application routing, React rendering engine, or database middleware to handle the error.
		- Verify missing files:
			- Many of your supplier image paths are returning 404.
			- You should check why your database is referencing image paths (like FC3M1500.jpg or FC1M1400.jpg) that do not actually exist in /media/suppliers/agri/.

- Container Restart LoopYour React Router / Prisma application logs show the startup sequence running repeatedly in a loop:

	- Plain text:
		> hw-storefront-ui@1.0.0 docker-start
		> npm run setup && npm run start
		...
		[react-router-serve] http://localhost:3000 (http://172.20.0.2:3000)
		...
		> hw-storefront-ui@1.0.0 docker-start  <-- It starts over again

		- Why this is happening:
			If this is running in Docker, Kubernetes, or a process manager (like PM2), the container/process is likely being restarted. This usually happens for one of two reasons:
			- Liveness Probe Failure:
				- If your hosting environment has a health check configured to ping / or another endpoint, it might be timing out because the server is too busy processing those incredibly slow 750ms 404 image requests. When the health check fails consecutively, the orchestrator kills and restarts the container.
			- Port Mismatch/Binding Issue:
				- The server is binding to port 3000 (http://localhost:3000). However, your Cloudflare tunnel log from earlier was attempting to route traffic to http://localhost:5130. If your outer hosting environment is expecting the application to respond on port 5130 (or another port) and it doesn't see traffic, it may assume the container is dead and restart it.

	- The Fix:
		- Align your ports: Double-check that your Docker port mappings or hosting configurations match. If the application starts on 3000, ensure your proxy/tunnel is pointing to port 3000 instead of 5130.
		- Temporarily ease health checks:
			- If you have health checks (liveness/readiness probes) configured in Docker Compose or Kubernetes, increase their timeout duration and threshold so they don't aggressively restart your container while it is struggling with the slow requests.
