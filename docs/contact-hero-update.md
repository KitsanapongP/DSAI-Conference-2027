# CFP, imagery, contact and typography update — 12 November 2026

## Published content

- Home: use the supplied 2400 × 1600 Wat Nong Waeng crop, with a 1200px
  desktop image region, 620px hero and a long 45% left-edge fade. The temple
  stays on the right. Narrow screens use a 1200 × 800 WebP derivative below
  the text. The visible caption was removed at the owner's request.
- Call for Papers: publish the supplied preliminary poster with an uncropped
  preview, full-size opening and original JPG download. Show its date, venue,
  preliminary status and pending submission details as readable HTML.
- Conference overview/topics: use the poster's six proposed groups, subject to
  DS-AI confirmation. Responsible AI/safety topics are included in group three.
- Home and Venue: list The Heritage Grand Khon Kaen Hotel and Convention,
  Khon Kaen, Thailand, explicitly sourced from the preliminary CFP. Travel,
  deadlines, submission portal and proceedings arrangements remain pending.
- Every interior page: remove the decorative icon above its heading.
- Shared footer: retain Khon Kaen University and the complete original postal
  address; change only the email to sarunap@kku.ac.th. No personal name or phone.

All three supplied originals are copied unchanged into apps/web/public/images:
wat-nong-waeng-original.jpg (11049 × 4672), wat-nong-waeng-2400x1600.jpg
(2400 × 1600) and dsai2027-preliminary-cfp.jpg (4961 × 7016). SHA-256 pairs
were checked against the supplied files. Display derivatives are resized and
converted only. CSS cover can trim surrounding sky/foreground on desktop;
the source files and poster are not raster-cropped. Earlier candidate images
are retained with their provenance in images/ATTRIBUTION.md. The previous
Commons license does not apply to the owner's replacement photograph.

## Typography

Montserrat is retained. Shared CSS tokens use Home's 16px About copy and
31–45px section heading scale. Prose, pending notices, lists and footer body
use 16px / 1.85, weight 400. Section/page headings use weight 650; subtitles
20px, navigation/controls 13px and labels 10px. Hero and branding have distinct
roles. Existing rules, including mobile rules, consume the shared tokens.
Poster typography is part of the supplied image and remains unchanged.

## Verification

- npm ci --no-fund: passed on Node 24.11.1; container uses Node 22 Linux.
- npm run check: passed lint/types/build and export validation of 28 HTML files
  and 2,372 local references.
- npm run audit: high/critical gate passed; 7 moderate Windows entries remain
  in the existing development-only typescript-eslint/minimatch chain. Linux
  install reported 8 moderate entries; no forced dependency fix or suppression.
- npm run test:container: passed 7 release-script fixtures, actual Nginx image
  build/health/config, 4 Chromium desktop/mobile tests and HTTP smoke. Its
  separate test containers/network were removed; preview was not affected.
- Actual Docker preview: all 25 published routes checked at 390/1440px (50 page
  checks) for font family, body size/line height, page title styles against
  Home and horizontal overflow. Representative screenshots visually inspected
  after fonts/images loaded. CFP full-size opening and JPG download passed.
- Contact checked at desktop/mobile: original university/address, exactly one
  mailto link for sarunap@kku.ac.th, no personal name. Shared heading icons absent.

## Preview and release boundary

Docker Compose/Nginx is left running healthy at http://127.0.0.1:3002 using
`docker compose up -d --build --wait`. The earlier Next dev on 3000 was stopped.
No production deployment or organiser UAT has been performed. Review/CI,
content approval, HTTPS ownership and release/rollback requirements remain in
release-readiness.md and deployment.md. Deployment configuration and rollback
procedures are unchanged; pushing this branch does not publish to Plesk/VM.
