# Notes for Michel and Codex

- Make all website changes on `main`; it is the source of truth.
- Never edit `metanet-deploy` manually. GitHub Actions regenerates that branch after every push to `main`, and Plesk publishes it automatically.
- Keep the `noindex, nofollow` protections in `index.html`, `app/layout.tsx`, and `build/metanet.htaccess`. This is a private-by-link museum pitch and must stay out of search results.
- Run `npm run test:metanet` and `npm run lint` before pushing.
- Keep the production address `https://www.become-a-legend.com/` and the Let's Encrypt exception in the Metanet `.htaccess` unless the hosting setup changes.
