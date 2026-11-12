# Home hover fix — 12 November 2026

Scope: Home's About/Important dates buttons and Important Dates rows.

The About button inherited a pale hover background from button-sand while its
hero rule retained white text. The Important dates link inherited cream hover
text from light-link while keeping a white background. Remove those two legacy
variant classes from the hero and explicitly set both foreground/background
and border for hover and keyboard focus-visible. Use the existing theme-hover
and theme-blue-text tokens, matching the other Home links. Important Dates rows
now use the same hover colors, including their date text. Rows remain plain
information; no artificial tab stops or click behavior were added.

Validation:
- npm run check passed: lint/types/build, 28 HTML files / 2,372 local references.
- npm run audit passed its high/critical gate; 7 existing moderate development
  dependency findings remain.
- npm run test:container passed release fixtures, real Nginx build/health/config,
  four desktop/mobile browser tests and HTTP smoke; its test containers removed.
- Actual port-3002 preview at 390, 785 and 1440px: both button hover and keyboard
  focus colors match the existing underlined links; arrow inherits the same
  foreground. Timeline rows match these colors. Hover screenshots inspected.
  About/#about and Important dates/#dates links still work.

Docker preview was rebuilt and is left running healthy on 127.0.0.1:3002.
No production publication or deployment performed. Changes remain on
codex/fix-home-hover for review; release/rollback procedures are unchanged.
