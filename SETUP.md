# Pasang TERTORTOR MUSE di PC lain (Windows)

## Sebelum mulai (manual, ±5 menit)

1. Pasang **Muse.app** (Meta) dan login dengan akun Meta yang dipakai di PC itu. Di Settings Muse, izinkan akses file
   ke folder `Documents` dan **Computer use** (dipakai untuk Chrome).
2. Repo `Zzzeen2552/tertortor-muse` public: clone tidak butuh login GitHub. Login hanya perlu bila PC itu juga akan
   push perubahan (akun `Zzzeen2552` atau collaborator). Repo GitHub `tertortor-muse` harus dibuat dulu dari laptop utama.
3. Di Chrome: login sendiri ke **Google Flow**, **Google AI Studio**, dan
   **RunningHub**. Muse tidak boleh mengetik password untukmu.
4. Buka percakapan baru di Muse.app dan sebutkan folder kerja `Documents`.

## Prompt untuk Muse (tempel apa adanya)

```text
Siapkan TERTORTOR MUSE di PC Windows ini. Kerjakan berurutan, cek tiap langkah, dan berhenti lalu tanya saya kalau ada yang butuh login, password, API key, atau izin admin. Jangan pernah mengetik password atau API key untuk saya.

1. Cek prasyarat: git, Node.js 22 atau lebih baru, ffmpeg + ffprobe di PATH. Yang belum ada, pasang lewat winget (Git.Git, OpenJS.NodeJS, Gyan.FFmpeg), buka shell baru, lalu cek versinya lagi.
2. Clone https://github.com/Zzzeen2552/tertortor-muse.git ke %USERPROFILE%\Documents\TERTORTOR MUSE. Repo-nya public, jadi clone tidak butuh login. Kalau foldernya sudah ada, cukup git pull.
3. Di folder TERTORTOR MUSE: npm install, lalu npx hyperframes skills (memasang skill HyperFrames ke ~/.agents/skills).
4. Bangun kit efek suara: node tools/sfx.mjs.
5. Pasang whisper.cpp: unduh rilis Windows resmi whisper-bin-x64.zip dari github.com/ggml-org/whisper.cpp/releases, ekstrak sehingga ada tools/bin/whisper/Release/whisper-cli.exe. Sebutkan ukuran file sebelum mengunduh. Folder tools/bin tidak ikut git.
6. Buat file .env kosong di root (tidak ikut git) dengan baris GEMINI_API_KEY=, ELEVENLABS_API_KEY=, dan MUSE4AI_KEY=. Saya yang mengisi nilainya sendiri.
7. Buat shortcut Desktop: powershell -NoProfile -ExecutionPolicy Bypass -File tools\install-shortcut.ps1
8. Uji: npm run studio, buka http://localhost:4341 di Chrome. Pastikan "Buat video" hanya punya 3 kategori: Video Explainer (Hyperframe, SNAPCN, VOX), Storytelling (Berakit ke Hulu, BumiDiPijak), Advertisement (Flashcut, BRI, App Demo). Jalankan juga npx hyperframes --version. Catatan: videos/uji-hyperframe di git tidak membawa suara dan footage, jadi npm run check di proyek itu boleh gagal karena file suara tidak ada. Itu bukan error pemasangan.
9. Baca MUSE.md, README.md, .muse/skills/video-vertikal/SKILL.md, .muse/skills/video-vertikal/LESSONS.md, .muse/skills/berakit-ke-hulu/SKILL.md, .muse/skills/bumidipijak/SKILL.md, dan .muse/skills/flashcut/SKILL.md supaya paham alur dan aturan proyek ini.
10. Simpan ke memori Muse untuk proyek ini:
   (a) Gambar di Google Flow gratis (0 kredit): generate gambar tanpa minta izin. Video Flow dan semua run RunningHub: laporkan biaya/kredit/koin dan catat di costs.md. Default video Flow: Omni 1.1 Flash 10 s. Kalau Flow menolak dengan "unusual activity", jangan retry otomatis; serahkan ke saya.
   (b) Thumbnail semua channel dan headline layar: setiap kata diawali huruf kapital (Title Case).
   (c) Naskah Berakit ke Hulu selalu memakai 10 shot dan ditutup dengan pencapaian merek hari ini.
   (d) TERTORTOR MUSE hanya jalan lokal (Studio port 4341). Tidak ada web app/relay: tombol Bagikan dan akses dari HP memang tidak aktif. Jangan deploy apa pun.
   (e) Jangan publish, upload, atau kirim ke Tebar/platform mana pun tanpa izin eksplisit saya per video.
   (f) Jawab saya dalam bahasa Indonesia santai.
11. Laporkan: versi tiap alat, apa yang terpasang, apa yang gagal, dan apa yang masih harus saya lakukan sendiri (isi .env, login Chrome ke Flow/AI Studio/RunningHub).

Catatan: proyek videos/ lama, footage, suara, key visual, dan video acuan tidak ada di git. Jangan anggap itu error. Kalau saya butuh proyek lama, saya salin sendiri folder videos/<slug>/ dari laptop utama.
```
