# Release checks — 2026-09-29

Tested the final static Metanet build locally at port 3001 in the Codex browser.

## Passed

- `npm test`: production build plus four tests for domain-root assets, indexing configuration, referenced media/fonts/video clips, and exclusion of source/credentials from deployment output.
- `npm run lint`: zero errors; 14 existing Next.js recommendations about using `next/image` remain. This release is a static React build with ordinary image elements.
- All eight exhibition categories plus Funding, Inventory and Contact opened and returned to the model at 1280 × 800 and 390 × 844.
- Small-screen menu at 320 × 568; visual checks of model, contact and film views. No horizontal document overflow detected during the 390px section checks.
- Keyboard activation of every category and return button; hidden menu is inert.
- Entry sequence, detail refresh, browser back/forward navigation.
- No browser console errors recorded; no broken completed images or video errors recorded during section checks.
- All twelve film-wall clips reported readyState 4 and active playback in the test browser.
- Local PDF target exists and is included in release output.

## Changes prompted by checks

- Mobile layout now responds to width, including narrow windows with a mouse.
- Model footer buttons no longer overlap or clip on narrow screens; menu and funding badge scale down.
- Closed menu links cannot receive keyboard focus.
- Detail URL hashes survive reload; browser forward restores the detail view.
- Disabled session storage no longer prevents entry.
- Removed unused random still-image selection and corrected hook dependencies.

## Still required before public sharing

- Real iPhone/Safari and Android/Chrome tests, including touch gestures, video autoplay restrictions, orientation changes and constrained network conditions. These were not emulated or tested on physical devices here.
- Actual Metanet deployment, certificate/redirect checks, and Apache/nginx header verification. Vite preview does not run `.htaccess`.
- Verify noindex response headers on PDFs and other static files if nginx serves them directly.
- Final editorial approval of the English copy and linked PDF.

No Metanet publication was performed. The user is handling publication.
