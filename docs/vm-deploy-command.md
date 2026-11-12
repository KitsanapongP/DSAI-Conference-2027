# Deploy บน VM ด้วยคำสั่งเดียว

ปรับรูปแบบตั้งแต่ข้อ 8 ของคู่มือกลางที่ผู้ดูแลส่งมา โดยใช้เครื่องและ config เดิม
DSAI มี Docker, repository, Nginx และ self-signed certificate แล้ว จึงไม่ต้องทำ
ขั้นติดตั้ง Docker/clone/สร้าง .env หรือ certificate ใหม่

## หลักการ

`~/bin/deploy-web <site.conf>` อ่าน PROJECT_NAME, DEPLOY_BRANCH และ WEB_SERVICE
จาก trusted Bash config แล้ว fetch branch ที่กำหนด (เช่น main) และ deploy tip
ที่ดึงมาได้ล่าสุด ไม่ต้องระบุหรืออัปเดต APPROVED_COMMIT ใน config
คำสั่งเป็นแบบ standalone ใช้กับ web หรือ frontend ตาม service ของแต่ละเว็บได้
ไม่ต้องมี deploy helper ภายใน repository ของ INCIT และรันจากโฟลเดอร์ไหนก็ได้

main ต้องผ่าน review/CI ก่อน merge ตามขั้นตอนทีม คำสั่งนี้ไม่ได้ query GitHub CI
และไม่ใช่วิธีเลือก release SHA ล่วงหน้า ผู้ดูแลเลือกพฤติกรรม main ล่าสุดเพื่อใช้
คำสั่งกลางเดียวกับ INCIT หากต้องการระบุ SHA โดยตรง สคริปต์เดิมใน repository
ยังใช้ได้และไม่ได้เปลี่ยนพฤติกรรม

ยังคงตรวจ clean tree (รวม untracked files), branch, fast-forward และ lock
.git/deploy.lock ร่วมกับ helper เดิม เพื่อป้องกัน deploy ซ้อน ตั้ง Compose project
ตาม config ไม่รับค่า IMAGE_TAG/พอร์ตที่เผลอค้างใน shell บันทึก current/previous/
attempted tags ใน .deploy และอัปเดต IMAGE_TAG ใน .env หลัง healthy ผ่านเท่านั้น
ถ้า build ล้มจะไม่เปลี่ยน container; ถ้า up/health ล้ม container อาจเปลี่ยนแล้ว
จึงต้องตรวจ logs และเลือก rollback image ที่ยืนยันแล้ว

Repository ต้องมี Dockerfile/Compose/healthcheck ตามคู่มือกลาง และ ignore .env,
.env.* และ .deploy/ จาก Git สคริปต์ไม่เปลี่ยน Dockerfile, .env, certificate หรือ
Nginx proxy ของเว็บอื่นระหว่างการติดตั้ง ยังไม่ถือว่าได้ทดสอบกับ INCIT จริงจนกว่า
ผู้ดูแลจะตรวจ config/Compose ของ INCIT และทดสอบบนระบบนั้น

## ติดตั้งครั้งเดียวต่อบัญชี

หลังไฟล์ชุดนี้ผ่าน review และอยู่ใน checkout บน VM แล้ว รัน:

```bash
cd /srv/websites/dsai2027
bash scripts/install-vm-deploy-command.sh
bash -n "$HOME/bin/deploy-web"
```

installer ติดตั้ง `scripts/vm-deploy-command.sh` เป็น `~/bin/deploy-web` ด้วย mode
700 หากมีไฟล์เดียวกันแล้วจะไม่ติดตั้งซ้ำ หากเป็นไฟล์อื่นหรือ symlink จะหยุดและ
เก็บของเดิมไว้ ให้ตรวจร่วมกับผู้ดูแลก่อนแทนที่ โดยเฉพาะคำสั่งที่เว็บอื่นใช้อยู่
หากต้องใช้ชื่อแยก สามารถเลือกปลายทางได้ เช่น:

```bash
bash scripts/install-vm-deploy-command.sh "$HOME/bin/deploy-dsai"
```

## ใช้ config เดิม

DSAI ใช้ ~/.config/vm-deploy/dsai2027.conf ที่มีอยู่แล้ว โดยค่าคือ:

```bash
PROJECT_NAME='dsai2027'
REPO_URL='git@github.com:KitsanapongP/DSAI-Conference-2027.git'
DEPLOY_BRANCH='main'
WEB_SERVICE='web'
WEB_PORT='3002'
BIND_IP='127.0.0.1'
```

ไม่ต้องเพิ่ม APPROVED_COMMIT และไม่ต้องเขียนไฟล์เดิมทับด้วย example
เก็บ config mode 600 และไม่ source .env ค่าพอร์ต/bind ที่ runtime ใช้จริงอยู่ใน
.env ซึ่งเตรียมไว้แล้วตอนติดตั้งครั้งแรก

## อัปเดตเว็บแต่ละครั้ง

หลังงานผ่าน review/CI และ merge เข้า main ให้ต่อ VPN/SSH แล้วรันเพียง:

```bash
~/bin/deploy-web ~/.config/vm-deploy/dsai2027.conf
```

สำหรับ INCIT ใช้คำสั่งเดียวกันแต่ส่ง path config ของ INCIT ที่มีอยู่จริง
PROJECT_NAME และ WEB_SERVICE ของแต่ละเว็บต้องตรงกับโฟลเดอร์/Compose นั้น
ไม่คัดลอกค่า service web หรือพอร์ต 3002 ของ DSAI ไปทับ INCIT
หากเลือกชื่อ deploy-dsai ตอนติดตั้ง ให้ใช้ชื่อนั้นแทน deploy-web
การ build/up ยังใช้ sudo ตามเดิม จึงอาจถามรหัสผ่านใน Terminal

## ตรวจหลัง healthy

```bash
cd /srv/websites/dsai2027
sudo docker compose --env-file .env ps
cat .deploy/current-release
cat .deploy/previous-release
```

ตรวจ HTTPS โดยใช้ public certificate เดิม (ไม่มีการเปลี่ยน trust store):

```bash
for path in / /dsai2027/call-for-papers/ \
  /images/wat-nong-waeng-2400x1600.jpg \
  /images/dsai2027-preliminary-cfp-preview.webp /images/dsai-logo.png
do
  printf '\n%s\n' "$path"
  sudo curl --fail --silent --show-error --head \
    --cacert /etc/nginx/ssl/dsai2027/server.crt \
    "https://10.198.110.63:8443$path"
done
```

ควรได้ 200 พร้อม Content-Type ที่ตรงกับไฟล์ และตรวจ browser ผ่าน VPN ตามจริง
DSAI ใช้ HTTPS 8443; INCIT ใช้ 443 ไม่ต้องเปลี่ยน Nginx/certificate เมื่ออัปเดตแอป
healthy หรือ HTTP HEAD ไม่ใช่การตรวจ UAT เต็มรูปแบบ

## ดู logs และ rollback ตามข้อ 9

```bash
cd /srv/websites/dsai2027
sudo docker compose --env-file .env logs --tail=100 web
sudo docker image ls dsai2027-web
cat .deploy/previous-release
```

เลือก tag ที่ตรวจแล้วว่าใช้งานได้จริง แทน CONFIRMED_PREVIOUS_TAG:

```bash
bash scripts/rollback-web.sh \
  "$HOME/.config/vm-deploy/dsai2027.conf" CONFIRMED_PREVIOUS_TAG
```

rollback ใช้ retained image โดยไม่ build/pull และบันทึก IMAGE_TAG หลัง healthy
แล้วตรวจ HTTPS/browser ซ้ำ การย้อน image ไม่ย้อน config ต้องใช้ค่าที่เข้ากัน
คง images รุ่นที่ใช้งานได้ไว้ และไม่ prune หรือสั่ง down ทั้ง VM

การติดตั้ง/ทดสอบคำสั่งใน local fixture ไม่ใช่การติดตั้งลงบัญชี project บน VM จริง
ต้องนำไฟล์ที่ผ่าน review/CI ไปติดตั้งตามขั้นข้างต้นก่อนใช้งานจริง

## ผลตรวจในเครื่องพัฒนา

ตรวจวันที่ 12 พฤศจิกายน 2026: `npm run check` ผ่าน (28 HTML, 2,428 local
references), `npm run audit` ผ่านเกณฑ์ high โดยยังมี 7 moderate findings,
และ `npm run test:container` ผ่าน deployment fixtures 20 กรณี พร้อม browser
tests desktop/mobile 6 กรณี และ HTTP smoke บน Nginx container แยกในเครื่อง
ยังไม่ได้ติดตั้งคำสั่งนี้บน VM หรือทดสอบกับ INCIT จริง
