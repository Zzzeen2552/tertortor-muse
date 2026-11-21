# Pasang TERTORTOR MUSE

Muse (Muse.app dari Meta) yang memasang dan menjalankan proyek ini. Pilih bagian sesuai komputernya: **Mac** atau
**Windows**. Prompt di tiap bagian ditempel apa adanya ke percakapan baru di Muse.app.

# Mac

## Sebelum mulai (manual, ±5 menit)

1. Pasang **Muse.app** dan login dengan akun Meta-mu.
2. Di Muse.app → Settings:
   - **Files and folders**: izinkan folder `Documents`.
   - **Computer use**: nyalakan (dipakai untuk Chrome: Google Flow, AI Studio, RunningHub).
3. Pasang **Homebrew** sendiri bila belum ada (butuh password Mac, jadi bukan tugas Muse). Buka Terminal, tempel
   perintah dari https://brew.sh, ikuti sampai selesai. Cek dengan `brew --version`.
4. Di Chrome: login sendiri ke **Google Flow**, **Google AI Studio**, dan **RunningHub**.
5. Saat Muse minta izin **menjalankan program dari folder di luar folder Hatch**, izinkan untuk folder
   `~/Documents/TERTORTOR MUSE`. Semua perintah proyek (`npm`, `node tools/…`, `npx hyperframes`) jalan dari sana.

## Prompt untuk Muse.app (Mac, tempel apa adanya)

```text
Siapkan TERTORTOR MUSE di Mac ini. Kamu (Muse) adalah agen proyek ini. Kerjakan berurutan, cek hasil tiap langkah, dan berhenti lalu tanya saya kalau ada yang butuh login, password, API key, sudo, atau izin. Jangan pernah mengetik password atau API key untuk saya.

1. Cek prasyarat dan cetak versinya: brew, git, node (harus 22 atau lebih baru), npm, ffmpeg, ffprobe, yt-dlp, whisper-cli. Kalau brew belum ada, berhenti dan minta saya memasangnya dari https://brew.sh (butuh password). Kalau git belum ada, minta saya menjalankan xcode-select --install. Yang lain yang belum ada atau terlalu lama, pasang dengan: brew install node ffmpeg yt-dlp whisper-cpp. Lalu cek versinya lagi.
2. Clone https://github.com/Zzzeen2552/tertortor-muse.git ke "$HOME/Documents/TERTORTOR MUSE" (nama folder pakai spasi, selalu beri tanda kutip). Repo-nya public, jadi tidak butuh login. Kalau foldernya sudah ada, cukup git pull.
3. Di folder itu: npm install, lalu npx hyperframes skills (memasang skill HyperFrames ke ~/.agents/skills). Cek npx hyperframes --version = 0.9.15. npm install juga menyalakan git hook proyek (core.hooksPath = .githooks) dan membuat "TERTORTOR MUSE.app" di Desktop; cek keduanya ada. Kalau app-nya belum muncul, buat ulang dengan npm run shortcut.
4. Bangun kit efek suara: node tools/sfx.mjs.
5. Buat file .env di root folder itu bila belum ada (tidak ikut git) berisi tiga baris kosong: GEMINI_API_KEY=, ELEVENLABS_API_KEY=, dan MUSE4AI_KEY=. Kalau .env sudah ada, jangan diubah. Saya yang mengisi nilainya sendiri.
6. Uji Studio: jalankan npm run studio di latar dan biarkan tetap hidup, lalu cek http://localhost:4341 menjawab 200 dan http://localhost:4341/api/structure berisi 4 kategori: Video Explainer (Hyperframe, SNAPCN, VOX), Storytelling (Berakit ke Hulu, BumiDiPijak), Advertisement (Flashcut, BRI, App Demo), Cinematic (AWS, Sport Strava). Buka http://localhost:4341 di Chrome supaya saya bisa melihatnya. Catatan: videos/uji-hyperframe di git tidak membawa suara dan footage, jadi npm run check di proyek itu boleh gagal karena file suara tidak ada. Itu bukan error pemasangan.
7. Baca MUSE.md (aturan utama proyek ini, termasuk cara kerjamu di sini), README.md, lalu .muse/skills/video-vertikal/SKILL.md, .muse/skills/video-vertikal/LESSONS.md, .muse/skills/berakit-ke-hulu/SKILL.md, .muse/skills/bumidipijak/SKILL.md, dan .muse/skills/flashcut/SKILL.md supaya paham alur dan aturannya.
8. Simpan ke memorimu untuk proyek ini:
   (a) Folder kerja TERTORTOR MUSE = ~/Documents/TERTORTOR MUSE. Setiap percakapan tentang TERTORTOR, baca MUSE.md dulu. "/nama-skill <slug>" artinya baca .muse/skills/<nama-skill>/SKILL.md lalu ikuti langkahnya. Perintah dijalankan dari folder itu.
   (b) Klik di Studio masuk ke .events.jsonl. Kalau saya bilang "lanjut", jalankan node tools/wait-event.mjs --timeout 1 lalu tangani event yang muncul sesuai MUSE.md § Pemicu dari Studio.
   (c) Gambar di Google Flow gratis (0 kredit): generate gambar tanpa minta izin. Video Flow dan semua run RunningHub: laporkan biaya/kredit/koin dan catat di costs.md. Default video Flow: Omni 1.1 Flash 10 s. Kalau Flow menolak dengan "unusual activity", jangan retry otomatis; serahkan ke saya.
   (d) Thumbnail semua channel dan headline layar: setiap kata diawali huruf kapital (Title Case).
   (e) Naskah Berakit ke Hulu selalu memakai 10 shot dan ditutup dengan pencapaian merek hari ini.
   (f) TERTORTOR MUSE hanya jalan lokal (Studio port 4341). Tidak ada web app/relay: tombol Bagikan dan akses dari HP memang tidak aktif. Jangan deploy apa pun.
   (g) Jangan commit, push, publish, upload, atau kirim ke Tebar/platform mana pun tanpa izin eksplisit saya per kali.
   (h) Jawab saya dalam bahasa Indonesia santai.
9. Laporkan: versi tiap alat, apa yang terpasang, apa yang gagal, dan apa yang masih harus saya lakukan sendiri (isi .env, login Chrome ke Flow/AI Studio/RunningHub).

Catatan: proyek videos/ lama, footage, suara, key visual, dan video acuan tidak ada di git. Jangan anggap itu error. Kalau saya butuh proyek lama, saya salin sendiri folder videos/<slug>/ dari laptop utama.
```

Sesudahnya: buka Studio dari **TERTORTOR MUSE.app** di Desktop (menyalakan ulang server Studio folder ini lalu membuka
http://localhost:4341), atau `npm run studio` dari folder itu. Kerja video dimulai dari Muse.app ("/video-vertikal <slug>", "lanjut", dst.).
Tombol Chat di Studio menyalin pesan dan membuka Muse.app; tempel dengan ⌘V lalu Enter. Mau terkirim otomatis: tambahkan
`MUSE_AUTOPASTE=1` ke `.env` dan beri izin **Accessibility** (System Settings → Privacy & Security) ke app yang
menjalankan Studio.

# Windows

## Sebelum mulai (manual, ±5 menit)

1. Pasang aplikasi **Muse** untuk Windows dan login dengan akun Meta-mu.
2. Di Muse → Settings:
   - **File access**: nyalakan, lalu izinkan folder `Documents`.
   - **Computer use**: nyalakan (dipakai untuk Chrome: Google Flow, AI Studio, RunningHub).
3. Pastikan **winget** ada: buka PowerShell, ketik `winget --version`. Kalau tidak ada, pasang **App Installer** dari
   Microsoft Store.
4. Di Chrome: login sendiri ke **Google Flow**, **Google AI Studio**, dan **RunningHub**.
5. Saat Muse minta izin **menjalankan program dari folder di luar folder Hatch**, izinkan untuk folder
   `Documents\TERTORTOR MUSE`. Semua perintah proyek (`npm`, `node tools\…`, `npx hyperframes`) jalan dari sana.
6. Kalau Windows memunculkan jendela **izin admin (UAC)** saat winget memasang sesuatu, klik sendiri. Muse tidak boleh
   menyetujuinya.

## Prompt untuk Muse (Windows, tempel apa adanya)

```text
Siapkan TERTORTOR MUSE di PC Windows ini. Kamu (Muse) adalah agen proyek ini. Kerjakan berurutan, cek hasil tiap langkah, dan berhenti lalu tanya saya kalau ada yang butuh login, password, API key, atau izin admin. Jangan pernah mengetik password atau API key untuk saya, dan jangan menyetujui jendela izin admin untuk saya.

1. Cek prasyarat dan cetak versinya: winget, git, node (harus 22 atau lebih baru), npm, ffmpeg, ffprobe, yt-dlp. Kalau winget tidak ada, berhenti dan minta saya memasang App Installer dari Microsoft Store. Yang belum ada atau terlalu lama, pasang dengan winget: Git.Git, OpenJS.NodeJS, Gyan.FFmpeg, yt-dlp.yt-dlp (tambahkan --accept-source-agreements --accept-package-agreements). Setelah memasang, buka shell baru (PATH baru) lalu cek versinya lagi.
2. Clone https://github.com/Zzzeen2552/tertortor-muse.git ke "%USERPROFILE%\Documents\TERTORTOR MUSE" (nama folder pakai spasi, selalu beri tanda kutip). Repo-nya public, jadi tidak butuh login. Kalau foldernya sudah ada, cukup git pull.
3. Di folder itu: npm install, lalu npx hyperframes skills (memasang skill HyperFrames ke ~/.agents/skills). Cek npx hyperframes --version = 0.9.15. npm install juga menyalakan git hook proyek (core.hooksPath = .githooks) dan membuat shortcut "TERTORTOR MUSE" di Desktop; cek keduanya ada.
4. Bangun kit efek suara: node tools/sfx.mjs.
5. Pasang whisper.cpp untuk transkripsi suara: unduh rilis Windows resmi whisper-bin-x64.zip dari https://github.com/ggml-org/whisper.cpp/releases (rilis terbaru). Sebutkan ukuran filenya dan minta izin saya sebelum mengunduh. Ekstrak sehingga ada tools\bin\whisper\Release\whisper-cli.exe, lalu jalankan whisper-cli.exe --help untuk cek. Folder tools\bin tidak ikut git.
6. Buat file .env di root folder itu bila belum ada (tidak ikut git) berisi tiga baris kosong: GEMINI_API_KEY=, ELEVENLABS_API_KEY=, dan MUSE4AI_KEY=. Kalau .env sudah ada, jangan diubah. Saya yang mengisi nilainya sendiri.
7. Kalau shortcut Desktop belum muncul, buat ulang dengan npm run shortcut.
8. Uji Studio: jalankan npm run studio di latar dan biarkan tetap hidup, lalu cek http://localhost:4341 menjawab 200 dan http://localhost:4341/api/structure berisi 4 kategori: Video Explainer (Hyperframe, SNAPCN, VOX), Storytelling (Berakit ke Hulu, BumiDiPijak), Advertisement (Flashcut, BRI, App Demo), Cinematic (AWS, Sport Strava). Buka http://localhost:4341 di Chrome supaya saya bisa melihatnya. Catatan: videos/uji-hyperframe di git tidak membawa suara dan footage, jadi npm run check di proyek itu boleh gagal karena file suara tidak ada. Itu bukan error pemasangan.
9. Baca MUSE.md (aturan utama proyek ini, termasuk cara kerjamu di sini), README.md, lalu .muse/skills/video-vertikal/SKILL.md, .muse/skills/video-vertikal/LESSONS.md, .muse/skills/berakit-ke-hulu/SKILL.md, .muse/skills/bumidipijak/SKILL.md, dan .muse/skills/flashcut/SKILL.md supaya paham alur dan aturannya.
10. Simpan ke memorimu untuk proyek ini:
   (a) Folder kerja TERTORTOR MUSE = %USERPROFILE%\Documents\TERTORTOR MUSE. Setiap percakapan tentang TERTORTOR, baca MUSE.md dulu. "/nama-skill <slug>" artinya baca .muse/skills/<nama-skill>/SKILL.md lalu ikuti langkahnya. Perintah dijalankan dari folder itu.
   (b) Klik di Studio masuk ke .events.jsonl. Kalau saya bilang "lanjut", jalankan node tools/wait-event.mjs --timeout 1 lalu tangani event yang muncul sesuai MUSE.md § Pemicu dari Studio.
   (c) Gambar di Google Flow gratis (0 kredit): generate gambar tanpa minta izin. Video Flow dan semua run RunningHub: laporkan biaya/kredit/koin dan catat di costs.md. Default video Flow: Omni 1.1 Flash 10 s. Kalau Flow menolak dengan "unusual activity", jangan retry otomatis; serahkan ke saya.
   (d) Thumbnail semua channel dan headline layar: setiap kata diawali huruf kapital (Title Case).
   (e) Naskah Berakit ke Hulu selalu memakai 10 shot dan ditutup dengan pencapaian merek hari ini.
   (f) TERTORTOR MUSE hanya jalan lokal (Studio port 4341). Tidak ada web app/relay: tombol Bagikan dan akses dari HP memang tidak aktif. Jangan deploy apa pun.
   (g) Jangan commit, push, publish, upload, atau kirim ke Tebar/platform mana pun tanpa izin eksplisit saya per kali.
   (h) Jawab saya dalam bahasa Indonesia santai.
11. Laporkan: versi tiap alat, apa yang terpasang, apa yang gagal, dan apa yang masih harus saya lakukan sendiri (isi .env, login Chrome ke Flow/AI Studio/RunningHub).

Catatan: proyek videos/ lama, footage, suara, key visual, dan video acuan tidak ada di git. Jangan anggap itu error. Kalau saya butuh proyek lama, saya salin sendiri folder videos/<slug>/ dari laptop utama.
```

Sesudahnya: buka Studio dari shortcut Desktop **TERTORTOR MUSE** (menyalakan server lalu membuka
http://localhost:4341), atau `npm run studio` dari folder itu. Kerja video dimulai dari aplikasi Muse
("/video-vertikal <slug>", "lanjut", dst.). Tombol Chat di Studio menyalin pesan dan membuka Muse dari menu Start;
tempel dengan Ctrl+V lalu Enter (kirim otomatis hanya ada di Mac).

# Memperbarui (Mac dan Windows)

Minta Muse "update TERTORTOR MUSE", atau jalankan sendiri dari folder proyek:

```bash
git pull
```

Setiap `git pull` memperbarui shortcut Desktop secara otomatis. Kalau `package.json` atau `package-lock.json` ikut
berubah, jalankan juga `npm install`. Lalu buka lagi shortcut **TERTORTOR MUSE**: Studio dinyalakan ulang dengan kode
terbaru. Clone yang dibuat sebelum ada fitur shortcut otomatis cukup menjalankan `npm install` sekali.
