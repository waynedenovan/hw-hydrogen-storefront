# Next task (2026-08-20)

Full context/root-causes for everything below: `2608192108_todo.md` (this
repo) and its companion in `hw-storefront-ui-node-docker`.

1. **Fill in real EFT banking details** once Wayne provides them
   (bank name, account holder, account number, branch code, SWIFT optional)
   into this repo's `.env.production` on the VPS (keys already present,
   empty), then force-recreate `hoseworld-online` to pick them up. See
   auto-memory `project_eft_pending_banking_details.md`.
2. **Full live-site checkout walkthrough** on `www.hoseworld.co.za` with a
   real cart, end to end: Information → Shipping (collection date/time
   window) → Method (confirm TCG shows as "Courier Delivery", never
   "Overnight", alongside Collection) → Review & Pay (PayFast, and EFT once
   #1 is done) → Success page.
3. **Known gap, not yet addressed:** collection-date validation doesn't
   account for ZA public holidays (no holiday calendar in this codebase).
