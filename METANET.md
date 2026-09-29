# Metanet / Plesk deployment

## Branches

- `metanet-ready`: maintained source and build configuration.
- `metanet-deploy`: **only the finished website**, including `.htaccess`. Select this branch in Plesk. No npm, Node.js, or extra deployment command is required on the web server.
- `main`: original project, left unchanged to avoid triggering its existing GitHub Pages publication or an existing Plesk deployment.

## First publication

1. In Plesk, open Git for `become-a-legend.com` and fetch updates.
2. Select **`metanet-deploy`** as the branch.
3. Set deployment to **Manual**. Select the actual document root shown under the domain's Hosting Settings as the deployment directory. Do not assume a directory name and do not publish into another domain's document root.
4. No additional deployment actions are necessary. Deploy the branch's contents directly into that directory, not a subdirectory.
5. Ensure both `become-a-legend.com` and `www.become-a-legend.com` are configured for this website and covered by the certificate. If Plesk manages a preferred domain, choose `www` to agree with `.htaccess`.
6. Open `https://www.become-a-legend.com/` and complete the live checks below.

The `.htaccess` requires Apache `mod_headers` and `mod_rewrite`. It excludes the website and files from indexing, disables directory listings, redirects HTTP and the bare domain to HTTPS/www, and exempts the Let's Encrypt validation path. If Plesk is configured to serve media directly through nginx, those responses can bypass `.htaccess`: verify the PDF and media response headers, then disable direct nginx static-file serving or apply `X-Robots-Tag: noindex, nofollow` in the nginx configuration as well. A 500 response requires checking the Plesk error log; do not remove the indexing protection to hide that error.

`noindex` is not access control. Anyone with the link can view or share the pitch. The original public GitHub repository/Pages site is a separate copy; this release does not make it private or remove previously indexed URLs.

## Future updates

Develop on `metanet-ready`, then run:

```sh
npm ci
npm run test:metanet
```

The finished files are in `metanet-dist/`, including its hidden `.htaccess` file. They can be uploaded to Plesk manually or committed as the next normal commit on `metanet-deploy`. Do not copy source files into the web root.

The **Verify Metanet build** GitHub Actions workflow runs after pushes to `metanet-ready` and provides the finished `metanet-website` artifact, including `.htaccess`. It never publishes to Metanet or changes the deployment branch. Upload the artifact contents manually or update `metanet-deploy` with the verified output. Keep Plesk deployment manual if publication should remain a separate decision.

## Live checks before sharing with museums

- Main domain and www resolve to the hosting; both HTTP addresses reach HTTPS/www without a loop.
- HTML contains the robots `noindex, nofollow` meta tag.
- HTML, `ninas-view-of-yoshi-moshi.pdf`, and media responses include `X-Robots-Tag: noindex, nofollow` (check nginx serving as described above).
- Entry screens, eight exhibition sections, Finances, Inventory, Contact, PDF link, and browser back/forward work.
- Test real iPhone/Safari and Android/Chrome, including inline video playback, touch targets, orientation changes, and slower mobile connections. Browser viewport tests do not replace real-device tests.
- Check certificate validity, missing files, and redirects on the actual Metanet host. Local Vite preview does not execute Apache `.htaccess`.

`npm test` and `npm run test:metanet` both run the static deployment checks. The obsolete starter-skeleton tests have been replaced.
