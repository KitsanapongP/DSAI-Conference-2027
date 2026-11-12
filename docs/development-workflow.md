# วิธีทำงานของ DSAI2027

เจ้าของเอกสาร: ผู้ดูแล repository (ต้องระบุ reviewer/release owner ใน PR)
ปรับใช้จาก Development Workflow Handbook ฉบับ 5 พ.ย. 2026 เมื่อ 6 พ.ย. 2026

## ข้อตกลงของโปรเจกต์

| เรื่อง | ค่าที่ใช้จริง |
| --- | --- |
| Repository | https://github.com/KitsanapongP/DSAI-Conference-2027 |
| Remote / branch รับงาน | `origin` / `main` |
| Branch งาน / review | `codex/<ชื่องาน>` / GitHub Pull Request |
| Runtime | Node 22 ใน CI/Docker; Node 24 ใช้ตรวจ local ได้; npm และ root lockfile |
| Production | static export → Nginx, service `web`, ภายใน 8080, host default 127.0.0.1:3002 |
| API / DB | Fastify scaffold เฉพาะ local; MariaDB driver ยังไม่เชื่อม DB; ไม่ deploy ทั้งสองส่วน |
| VM | `project@10.198.110.63`; SSH port/VPN/สิทธิ์ sudo ต้องยืนยัน |
| Reviewer / release owner / IT | ยังต้องระบุบุคคลจริง ไม่ถือว่าได้รับอนุมัติแล้ว |
| Domain / HTTPS / proxy | รอข้อมูลผู้ดูแล; ดู deployment.md |

ใช้หลักการของคู่มือกับ GitHub ที่มีอยู่ ไม่เพิ่ม GitLab remote หรือ pipeline ที่รันไม่ได้จริง

## เริ่มงานและ acceptance criteria

ระบุผลที่ต้องการ ขอบเขต และวิธีตรวจใน PR ก่อนทำงาน ตรวจ `git status`, README และ AGENTS.md
ถ้ามีงานค้างให้รักษาไว้ ไม่ reset ทิ้งเพื่อเปลี่ยน branch

```powershell
git fetch origin
# เมื่อ working tree สะอาด และเริ่มงานใหม่:
git switch -c codex/describe-task origin/main
npm ci
```

งาน preparation นี้เริ่มจาก main ที่ตรง origin/main และนำไฟล์ Docker/README ที่ค้างอยู่ไปทำต่อบน branch งาน โดยไม่ทิ้งการแก้ไขเดิม

## ตรวจงานก่อนส่ง review

```powershell
npm run check
npm run audit
npx --no-install playwright install chromium
npm run test:container
```

- `check`: lint/TypeScript ของ workspaces, production build, ตรวจ reference ภายใน static export
- `audit`: ตรวจทุก dependency รวมเครื่องมือพัฒนา; high/critical ทำให้ไม่ผ่าน ต้องอ่าน moderate ด้วย
- `test:container`: ตรวจ release helpers/คำสั่งกลางใน Linux fixture 20 กรณี (mock Git/Docker), build Linux image จริง รอ healthcheck, nginx -t, browser desktop/mobile, smoke HTTP และล้างเฉพาะ test container เมื่อจบ
- ชุด build ทดสอบจำลอง public files 600/directories 700 และ Nginx site config 600 ก่อนผ่าน runner จริง เพื่อจับปัญหา umask 077; browser ตรวจภาพ Home/CFP และไฟล์โปสเตอร์ต้นฉบับด้วย
- ใช้ project `dsai-release-check` และพอร์ต loopback `3102` แยกจาก preview; ต้องเปิด Docker Desktop/Engine และไม่ใช้ test ชุดนี้ซ้อนกัน
- `test:e2e`: สำหรับ container ที่เปิดไว้เอง ตั้ง `E2E_BASE_URL` เป็น loopback URL เท่านั้น
- ติดตั้ง Chromium ใหม่เมื่อ Playwright เปลี่ยน version; Linux ใช้ `npx --no-install playwright install --with-deps chromium`
- ยังต้องลอง keyboard/mobile และให้ผู้จัดตรวจข้อมูลจริง การ build หรือ healthcheck ไม่ใช่ UAT

ตรวจ `git diff` และไฟล์ใหม่ เลือก stage เฉพาะงาน ตรวจ `git diff --cached` แล้วจึง commit
ส่ง branch ด้วย `git push -u origin HEAD` และเปิด PR เข้า main พร้อมผลตรวจจริง/ข้อจำกัด/ผู้ review
แก้ feedback บน branch เดิม ไม่มี force push เป็นทางแก้เริ่มต้น งานใหม่ใช้ branch ใหม่หลัง PR merge

## CI และ release

`.github/workflows/ci.yml` ตรวจ PR, push main และ codex branches:
quality/export/security + Linux Nginx/browser checks เก็บ export และ diagnostics ตามความจำเป็น 3 วัน
GitHub branch protection ต้องตั้งผ่าน repository Settings ให้ `quality` และ `container` ผ่านและมี review ก่อน merge
การมี workflow ในไฟล์ยังไม่เท่ากับ branch protection ถูกตั้งแล้ว

Plesk workflow เปลี่ยนเป็นสั่งด้วยมือจาก main และต้องผ่าน checks ก่อน publish ไป branch plesk
เพื่อแยกการ merge ออกจากการปล่อยเว็บ ปลายทาง VM ใช้ขั้นตอน explicit ใน deployment.md
ไม่มี CI job ที่ login VM หรือ deploy production อัตโนมัติ

## API, tests และข้อมูล

เว็บปัจจุบันไม่มี form, login, upload, payment หรือ API request จึงยังไม่เพิ่มระบบทดสอบ CRUD/สิทธิ์ที่ไม่มีจริง
รายละเอียด local `/health` และ Postman อยู่ใน api.md เมื่อเพิ่ม API จริงจึงเพิ่ม OpenAPI, contract และ integration tests ตามความเสี่ยง
ใช้ข้อมูลสังเคราะห์ ห้ามเก็บรหัสผ่าน/token/private key ใน source, logs, images, screenshots หรือ Postman exports
หากพบ secret หลุดให้ revoke/rotate และแจ้งผู้รับผิดชอบ การลบไฟล์ไม่ลบ Git history

Definition of Done: acceptance criteria ผ่าน, checks ตามความเสี่ยงผ่าน, diff ไม่มี secrets/generated output,
docs/config ตรงกัน, PR review/CI ผ่าน และสำหรับ release มีผู้ตรวจผล/rollback พร้อมหลักฐานจริง
