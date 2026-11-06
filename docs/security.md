# Dependency and runtime decisions

Maintainer: repository owner. Updated 6 November 2026 for release preparation.

- Next.js and eslint-config-next: 16.3.8 → 16.4.5, the patched version reported by
  the registry audit during preparation. The served image contains only Nginx and
  the static export; it does not run Next.js image optimization, Server Actions,
  cache functions or the Fastify scaffold. Still update build dependencies.
- Fastify: 5.12.8. Transitive fast-uri and zod updated through compatible lockfile fixes.
- `npm audit fix` was run without `--force`. The remaining minimatch advisory
  GHSA-g3hv-75wg-m249 was in the development-only typescript-eslint parser chain.
  Its automatic force fix proposed downgrading eslint-config-next across a major
  version, which was not used.
- Remaining: 8 moderate audit entries share the development-only minimatch root
  cause, including affected parser/config dependents. They are not 8 independent
  runtime flaws. The current parser requests minimatch ^10.2.2 while the advisory
  fix is 11.0.1; a tested, supported upstream update remains a follow-up. No force
  downgrade or audit suppression is used. The high/critical gate passes, but the
  reviewer should explicitly consider this build-tool risk before release.

`npm run audit` checks the full dependency tree, failing on high/critical advisories;
also read lower-severity findings. Run it for each release because advisories change.
An npm audit does not scan Nginx/base OS packages or prove runtime security.
Rebuild with `--pull` for base image updates; record the resulting image ID/digest in
the release record. Base tags are mutable; rollback must use a retained release image,
not rebuild an old source tag. Infrastructure/container vulnerability scanning and
patch cadence should be assigned to the VM owner before production operations.

Runtime: unprivileged Nginx, port 8080, dropped capabilities, no-new-privileges,
read-only filesystem and bounded writable tmpfs. The container serves no secrets and
has no DB/upload volume. Access logs contain client request metadata; confirm log
access/retention with the operator. HTTPS certificates/renewal live at the approved
reverse proxy, not in this repository. HSTS is configured by the HTTPS owner after
the domain and TLS policy are confirmed.
