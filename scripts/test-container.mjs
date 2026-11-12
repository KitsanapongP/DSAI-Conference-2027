import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

// Separate project and port: never replace the local preview or a release container.
const env = { ...process.env, COMPOSE_PROJECT_NAME: 'dsai-release-check', WEB_BIND_IP: '127.0.0.1', WEB_PORT: '3102', IMAGE_TAG: 'check' };
function run(command, args, extra = {}) {
  const result = spawnSync(command, args, { stdio: 'inherit', env, ...extra });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} ${args.join(' ')} exited ${result.status}`);
}
const compose = ['compose', '-p', 'dsai-release-check'];
run('docker', [...compose, 'config', '--quiet']);
run('docker', ['run', '--rm', '--mount', `type=bind,source=${process.cwd()},target=/workspace,readonly`, '-w', '/workspace', 'node:22-bookworm-slim', 'bash', 'tests/deployment/release-scripts.sh']);
let failed = false;
try {
  // Reproduce a VM checkout made under umask 077, even on a Windows host.
  // Keep production instructions; inject restrictive source/config metadata.
  const dockerfile = readFileSync('Dockerfile', 'utf8');
  let restrictiveDockerfile = dockerfile;
  for (const [copy, restriction] of [
    ['COPY apps/web ./apps/web', 'RUN find /app/apps/web/public -type d -exec chmod 700 {} + && find /app/apps/web/public -type f -exec chmod 600 {} +'],
    ['COPY nginx.conf /etc/nginx/conf.d/default.conf', 'RUN chmod 600 /etc/nginx/conf.d/default.conf'],
  ]) {
    if (restrictiveDockerfile.split(copy).length !== 2) throw new Error('Review the restrictive permission fixture after changing the Dockerfile copy stages.');
    restrictiveDockerfile = restrictiveDockerfile.replace(copy, `${copy}\n${restriction}`);
  }
  run('docker', ['build', '--pull', '-t', 'dsai-release-check-web:check', '-f', '-', '.'], {
    input: restrictiveDockerfile,
    stdio: ['pipe', 'inherit', 'inherit'],
  });
  run('docker', [...compose, 'up', '-d', '--no-build', '--wait', '--wait-timeout', '180']);
  run('docker', [...compose, 'exec', '-T', 'web', 'nginx', '-t']);
  run(process.execPath, ['node_modules/@playwright/test/cli.js', 'test'], { env: { ...env, E2E_BASE_URL: 'http://127.0.0.1:3102' } });
  run(process.execPath, ['scripts/smoke.mjs', 'http://127.0.0.1:3102']);
} catch (error) {
  failed = true;
  console.error(error.message);
  spawnSync('docker', [...compose, 'logs', '--tail=100', 'web'], { stdio: 'inherit', env });
} finally {
  const cleanup = spawnSync('docker', [...compose, 'down'], { stdio: 'inherit', env });
  if (cleanup.status !== 0) failed = true;
}
process.exitCode = failed ? 1 : 0;
