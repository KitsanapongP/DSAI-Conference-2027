# DSAI logo local preview — 12 November 2026

Replace the shared header's CSS/text DSAI mark with the owner's supplied
dsai logo.png, copied unchanged to public/images/dsai-logo.png (1920 × 393).
Matching SHA-256: 77B1BC28321F790977F7CC41B71715EDDEBAF3E175EC1304402ABA40FA8B252C.
Preserve image transparency/aspect ratio and the Home link. Desktop width 230px;
small screens use 100–160px with proportionate institutional logos. Remove the
obsolete CSS/text mark rules. Favicon and footer text are unchanged.

Local checks:
- npm run check passed: 28 HTML files, 2,428 local references.
- npm run audit high/critical gate passed; 7 existing moderate development entries.
- npm run test:container passed: restrictive-permission fixture, real Nginx,
  6 desktop/mobile browser tests and HTTP smoke; test resources removed.
- Actual preview header checked at 320/360/390/600/785/1151/1200/1440/1920px:
  image loaded, original aspect ratio, no header overlap or horizontal overflow,
  and Home link functional. Desktop/mobile header screenshots inspected.

Docker preview rebuilt and left healthy at http://127.0.0.1:3002. The owner
reviewed the preview and authorized GitHub/Plesk publication after local checks.
Remote CI and Plesk publication are tracked in the PR/workflow; VM redeployment
and production UAT remain separate follow-up steps.
