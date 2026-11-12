# เตรียม deploy บน VM มหาวิทยาลัย

เจ้าของเอกสาร: ผู้ดูแล deployment; ผู้อนุมัติ release/ผู้ดูแลเครือข่ายต้องระบุจริงก่อนเปิดบริการ
ปรับจากคู่มือ VM กลาง 6 พ.ย. 2026 โดยใช้ config ของเว็บนี้

## สถานะและค่าที่ทราบ

- VM `10.198.110.63`, user `project` ตามข้อมูลผู้ใช้; SSH port, VPN, OS, sudo, Docker และพื้นที่ว่างยังต้องตรวจบนเครื่องจริง
- Repository GitHub, deployment branch `main`; deploy เฉพาะ commit เต็มที่ผ่าน review/CI
- `/srv/websites/dsai2027`, Compose project `dsai2027`, service `web`, host port `3002` (ต้องตรวจว่าไม่ชน)
- เริ่ม bind `127.0.0.1`; container Nginx non-root ภายใน `8080`, read-only root และ tmpfs สำหรับ runtime
- แอปเป็น static ไม่มีฐานข้อมูล/ไฟล์อัปโหลด/volume ที่ต้อง backup; เก็บ source, config และ images รุ่นก่อนเพื่อ rollback
- ยังไม่ทราบโดเมน/HTTPS owner และว่า proxy อยู่บน VM หรือเครื่องอื่น ห้ามเดาค่า public origin

ไฟล์ .env.example ใช้ WEB_BIND_IP, WEB_PORT, IMAGE_TAG ตรงกับคู่มือกลาง แทน DSAI_BIND_ADDRESS/DSAI_PORT เดิม
ถ้ามี .env เก่าให้แก้ชื่อค่าอย่างตั้งใจโดยรักษาค่าเดิม ไม่ copy ทับ

## ทดสอบในเครื่องก่อนขึ้น VM

```powershell
npm ci
npm run check
npm run audit
npx --no-install playwright install chromium
npm run test:container
```

Docker preview ทั่วไปใช้ `docker compose up -d --build --wait` แล้วเปิด http://127.0.0.1:3002
Compose ใช้ค่า default ได้ หรือ copy .env.example เป็น .env เฉพาะเมื่อยังไม่มีไฟล์จริง
`docker compose down` หยุดเฉพาะ project ปัจจุบัน ห้าม prune ทั้ง VM/ลบ volumes ของเว็บอื่น
Build ต้องออก registry/npm/Google Fonts ได้ ส่วน runtime เสิร์ฟ font และ assets ใน image

## ก่อนติดตั้งครั้งแรก (ต้องเข้าเครือข่ายที่เข้าถึง VM ได้)

1. ยืนยัน SSH port และ host fingerprint กับผู้ดูแล ใช้ key หรือกรอกรหัสผ่านเองใน SSH ห้ามส่ง password/private key ในแชตหรือ Git
2. เชื่อม `ssh -p CONFIRMED_PORT project@10.198.110.63` แล้วตรวจ OS/RAM/disk/sudo/Docker ตามคู่มือกลาง ไม่ติดตั้งซ้ำหากเครื่องมีบริการอยู่แล้ว
3. ใช้ read-only deploy key เฉพาะ repo; ตรวจ GitHub host fingerprint และไม่แก้ authorized_keys ของบัญชี
4. Clone main ที่ผ่าน review เข้า `/srv/websites/dsai2027`; ใช้ GitHub URL ใน deploy/dsai2027.conf.example
5. ตรวจพอร์ตว่างและสิทธิ์โฟลเดอร์ ให้บัญชี project เป็นเจ้าของ ห้ามใช้ reset ทิ้งงานที่มีอยู่

```bash
mkdir -p ~/.config/vm-deploy
# ตรวจว่าไฟล์ปลายทางยังไม่มี ก่อน copy; ถ้ามีให้อ่าน/แก้โดยรักษาค่าเดิม
cp deploy/dsai2027.conf.example ~/.config/vm-deploy/dsai2027.conf
chmod 600 ~/.config/vm-deploy/dsai2027.conf
test -e .env || (umask 077; cp .env.example .env)
chmod 600 .env
sudo docker compose --env-file .env config --quiet
```

ตัว config เป็น Bash ให้ใช้ไฟล์จากทีมที่เชื่อถือได้ เก็บ secrets แยก ไม่ source .env เป็น shell
ตรวจ .env ให้ COMPOSE_PROJECT_NAME=dsai2027, WEB_BIND_IP=127.0.0.1, WEB_PORT เป็นพอร์ตที่ตกลง

## Deploy เมื่ออนุมัติแล้วเท่านั้น

คำสั่งต่อไปนี้เริ่ม/เปลี่ยนบริการจริง จึงยังไม่รันระหว่าง preparation
ไม่จำเป็นต้องติดตั้ง Node บน VM: build อยู่ใน Docker

```bash
cd /srv/websites/dsai2027
bash -n scripts/deploy-web.sh scripts/rollback-web.sh scripts/vm-common.sh
bash scripts/deploy-web.sh ~/.config/vm-deploy/dsai2027.conf APPROVED_FULL_40_CHARACTER_COMMIT_SHA
sudo docker compose --env-file .env ps
curl --fail --silent --show-error http://127.0.0.1:3002/ > /dev/null
```

สคริปต์ตรวจ clean tree/branch, lock กัน deploy ซ้อน, fetch/fast-forward เท่านั้น,
ตรวจ SHA ที่อนุมัติตรง branch tip, build ก่อนเปลี่ยน container, ตั้ง tag `git-SHA-time-pid`,
บันทึก tag ก่อนหน้าใน `.deploy/previous-release` และ tag ที่พยายามปล่อยใน `.deploy/attempted-release`
อัปเดต IMAGE_TAG ใน .env หลัง container healthy สำเร็จเท่านั้น
หาก helper เปลี่ยนจากการ fast-forward จะหยุดให้ review/rerun script รุ่นใหม่
หาก build ล้มเว็บเดิมคงทำงาน; หาก up/health ล้ม container อาจเปลี่ยนแล้ว ต้องตรวจ logs/rollback เอง
healthy ยังไม่ใช่ยืนยันว่า release ผ่าน URL จริง

### รูปใหม่ตอบ 403 หลัง deploy

กรณี VM วันที่ 12 พ.ย. 2026: commit 68ebe7e ตอบ HTML 200 และ healthy แต่รูปใหม่
ใน image เป็น root:root 600 จึงตอบ 403 ทั้งที่ 127.0.0.1:3002 และ HTTPS 8443;
โลโก้เก่าซึ่งเป็น 664 ยังอ่านได้ สาเหตุคือสิทธิ์ source จาก checkout ภายใต้ umask 077
ถูกส่งต่อไปยัง static export/image โดย runner ใช้ Nginx สิทธิ์จำกัด

Dockerfile รุ่นแก้กำหนดเฉพาะ public webroot เป็น directories 755/files 644 และ
Nginx site config 644 ระหว่าง build โดยคง root owner และ non-root/read-only runtime
ไม่ต้อง chmod repository/.env หรือปรับ umask ของ deployment helper
ให้ deploy commit รุ่นแก้ที่ผ่าน CI ด้วยสคริปต์เดิม ไม่แก้ไฟล์ใน container ที่รันอยู่
เพราะ runtime เป็น read-only และการแก้ชั่วคราวจะหายเมื่อสร้าง container ใหม่

ตรวจภาพจริงหลัง deploy ด้วย ไม่ใช้แค่ HTML HEAD/healthcheck:

```bash
curl --fail --head http://127.0.0.1:3002/images/wat-nong-waeng-2400x1600.jpg
curl --fail --head http://127.0.0.1:3002/images/dsai2027-preliminary-cfp-preview.webp
```

URL ที่ผู้ดูแลยืนยันระหว่างตรวจ VM: DSAI https://10.198.110.63:8443/ และ INCIT
https://10.198.110.63:443/ ใช้ host Nginx คนละพอร์ต โดยใช้ self-signed certificate
ร่วมกันที่ /etc/nginx/ssl/dsai2027/server.crt ตามข้อกำหนดของผู้ดูแล ไม่เปลี่ยนใบรับรอง
หรือ route ของ INCIT เพื่อแก้ปัญหาไฟล์ใน image ทดสอบ TLS จาก VM โดยระบุ public
certificate ที่ตรวจสอบแล้วด้วย --cacert และยังคงตรวจชื่อ/IP และ validity ตามปกติ
ไม่ใช้ -k; browser/client อื่นต้องจัดการ trust กับผู้ดูแลแยกต่างหาก

เก็บ image เดิม git-340cc841da46-20261106T121943Z-26838 ไว้ด้วย รุ่น 68ebe7e
ที่มีปัญหาภาพจะกลายเป็น previous-release เมื่อปล่อยรุ่นแก้ จึงต้องเลือก rollback tag
ที่ตรวจสอบแล้ว ไม่เลือก previous tag โดยไม่ดูผลตรวจ รุ่นแก้ยังต้องยืนยันจาก VM จริง
และ browser หลังผู้ดูแลรัน deploy; local/CI ไม่ใช่หลักฐานว่า production แก้สำเร็จแล้ว

## HTTPS และเครือข่าย

ถ้า reverse proxy บน VM ให้ upstream `http://127.0.0.1:3002`
ถ้า proxy มหาวิทยาลัยอยู่เครื่องอื่น ต้องตกลง upstream ที่เข้าถึงได้กับ IT และแก้ WEB_BIND_IP เป็น interface ที่เหมาะสม
localhost ของ proxy คนละเครื่องใช้แทน VM ไม่ได้ และการ publish port ไม่ได้จำกัดเฉพาะ VPN อัตโนมัติ
อย่าเปลี่ยนเป็น 0.0.0.0 โดยยังไม่ยืนยัน firewall/routing; Docker published ports อาจข้าม UFW
กำหนด DNS, certificate/renewal, redirect HTTP→HTTPS และทดสอบจากกลุ่มผู้ใช้ที่ต้องเข้าถึงจริง
เว็บรองรับติดตั้งที่ root ของ hostname; หากต้องใช้ subpath ต้องปรับและทดสอบ basePath ก่อน build

จากเครื่องที่มี Node และเข้า URL จริงได้:

```powershell
npm run smoke -- https://CONFIRMED_DOMAIN
```

คำสั่งนี้อ่านหน้าและ assets เท่านั้น ตรวจ TLS ตามปกติ ไม่ใช้ -k/ปิด certificate verification
ลองคลิกเมนู desktop/mobile, refresh หน้ารอง, รูป/font, 404 และยืนยันเนื้อหากับผู้จัดด้วย

## Rollback และการดูแล

อ่าน tag จาก `.deploy/previous-release` ตรวจ image เก่ายังอยู่ (`sudo docker image ls`) และ config รุ่นนั้นเข้ากัน
หากเป็น release แรกและไม่มี image ก่อนหน้า ต้องปิด route ของเว็บนี้ที่ proxy/หยุด service ตามผู้ดูแล ไม่เดา tag

```bash
cd /srv/websites/dsai2027
bash scripts/rollback-web.sh ~/.config/vm-deploy/dsai2027.conf CONFIRMED_PREVIOUS_TAG
sudo docker compose --env-file .env logs --tail=100 web
```

Rollback ใช้ --no-build --pull never และ healthcheck แล้วบันทึก IMAGE_TAG กลับ
image rollback ไม่คืน Compose/Nginx config หรือข้อมูล ต้องใช้ config ที่เข้ากับรุ่นนั้น และรัน HTTPS smoke ซ้ำ
เก็บ images ล่าสุดที่ใช้งานได้อย่างน้อย 2 รุ่น อย่า prune ทั้ง VM
สำรอง .env, site config, reverse proxy/certificate config ด้วยสิทธิ์จำกัดของทีม
ตั้ง external monitoring/ผู้รับแจ้งเหตุและ owner ตรวจ renewal; log หมุน 10MB × 3 แต่ยังต้องดูแลพื้นที่ Docker
ทดสอบ rollback บน staging ก่อน production พร้อมบันทึก release SHA/tag/ผลตรวจ/ผู้รับผิดชอบใน release record
