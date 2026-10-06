# Metanet deployment

`main` is the only source branch. Every push to `main` runs the **Build Metanet release** GitHub Actions workflow. It builds and tests the static website, then replaces the generated files on `metanet-deploy`. Do not edit `metanet-deploy` by hand.

Plesk must track `metanet-deploy` with automatic deployment into the document root of `become-a-legend.com`. The GitHub repository webhook must point to the webhook URL displayed by Plesk. No npm command or deployment action is needed on the Metanet server.

The repository owner must allow GitHub Actions to write repository contents under **Settings → Actions → General → Workflow permissions → Read and write permissions**. This lets the workflow update `metanet-deploy`; it does not give Plesk access to the source branch.

In Plesk, select `metanet-deploy`, choose **Automatic** deployment, and use `/become-a-legend.com` as the server path/document root already assigned to this domain. Copy Plesk's webhook URL into **GitHub → Settings → Webhooks → Add webhook**, choose `application/json`, and subscribe to push events. Plesk will ignore `main` for publication and deploy when the generated branch changes.

The pitch must remain absent from search results. `index.html` contains a `noindex, nofollow` meta tag, `app/layout.tsx` carries equivalent framework metadata, and `build/metanet.htaccess` sends `X-Robots-Tag: noindex, nofollow` for the hosted files. Preserve all three protections.

Before pushing changes, run:

```sh
npm ci
npm run test:metanet
npm run lint
```

After a deployment, verify `https://www.become-a-legend.com/`, its certificate and redirects, and the `X-Robots-Tag` response header. `noindex` prevents search indexing; it does not restrict access to people who know the URL.

GitHub Pages is currently also enabled for this public repository. Its build receives the HTML `noindex` meta tag, while the stronger response-header protection applies on Metanet. Disable GitHub Pages in the repository settings if that additional public copy is no longer wanted.
