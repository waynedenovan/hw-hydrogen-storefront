2607071150 claude — cloudflare follow-up

## Status
- `cloudflared` tunnel `shopify-dev` (2c45b0c8-4560-4207-857f-ae654b13d5cb) is now running manually (`cloudflared tunnel run shopify-dev`, started in background, not a systemd service — restart it yourself each session with that command).
- Confirmed working: `https://app.hoseworld.store` → HTTP 302 (was Error 1033 before this was started).
- Not yet done: exposing the hydrogen storefront (port 5130) via this Cloudflare tunnel. ngrok remains the only external access path for it (`https://alfredia-prebudgetary-nonperceptibly.ngrok-free.dev`).

## Task: add hydrogen-storefront ingress to the Cloudflare tunnel

1. Pick a hostname for the hydrogen storefront (e.g. `store.hoseworld.store` or similar — needs to be on a zone Cloudflare already manages for this account).
2. Add a DNS route for it:
   ```
   cloudflared tunnel route dns shopify-dev <chosen-hostname>
   ```
3. Add an ingress rule in `~/.cloudflared/config.yml` **above** the existing catch-all, e.g.:
   ```yaml
   tunnel: 2c45b0c8-4560-4207-857f-ae654b13d5cb
   credentials-file: /home/rogue/.cloudflared/2c45b0c8-4560-4207-857f-ae654b13d5cb.json

   ingress:
     - hostname: app.hoseworld.store
       service: http://localhost:3458
     - hostname: <chosen-hostname>
       service: http://localhost:5130
     - service: http_status:404
   ```
4. Restart the `cloudflared tunnel run shopify-dev` process to pick up the config change.
5. Verify `https://<chosen-hostname>` serves the hydrogen storefront (same content as `localhost:5130` / the ngrok URL).
6. Update `.env`'s comment (`# Use https://app.hoseworld.store when testing via Cloudflare tunnel`) to reference the new hostname instead, since `app.hoseworld.store` actually routes to storefront-ui, not the hydrogen storefront.

## Open question for user
- What hostname should be used for the hydrogen storefront (needs to exist on the same Cloudflare-managed zone as `hoseworld.store`)?
