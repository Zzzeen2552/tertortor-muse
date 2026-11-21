# TERTORTOR MUSE

Duplikat TERTORTOR LITE (2026-11-21) dengan **Muse** (Muse.app, Meta) sebagai agen di semua peran yang dulu dipegang
Claude. Versi ramping dari MOTION/TERTORTOR (dibuat 2026-11-12). Studio jalan lokal di tiap komputer; repo GitHub hanya untuk
memasangnya di komputer lain. Tidak ada web app/relay.

- **Video Explainer**: Hyperframe, VOX, SNAPCN
- **Storytelling**: Berakit ke Hulu, BumiDiPijak
- **Advertisement**: Flashcut, BRI, App Demo

```bash
npm install
node tools/sfx.mjs      # kit efek suara (dibuat dari matematika, tidak ikut git)
npm run studio          # http://localhost:4341 (MOTION 4321, LITE 4331)
```

Lalu di **Muse.app** (folder kerja `TERTORTOR MUSE`, Muse membaca [MUSE.md](MUSE.md)) jalankan skill yang ditunjukkan Studio, mis. `/video-vertikal <slug>`,
`/berakit-ke-hulu <slug>`, `/bumidipijak <slug>`, `/flashcut <slug>`. Aturan lengkap di [MUSE.md](MUSE.md).

## Pasang di Mac

Prompt siap tempel untuk Muse.app ada di [SETUP.md § Mac](SETUP.md#mac): Homebrew dipasang sendiri, sisanya
(Node 22, ffmpeg, yt-dlp, whisper-cpp, clone, `npm install`, `.env` kosong, uji Studio di port 4341) dikerjakan Muse.

## Pasang di komputer lain (Windows)

Prompt siap tempel untuk aplikasi Muse ada di [SETUP.md § Windows](SETUP.md#windows). Ringkasnya:

1. Pasang Git, Node.js 22+, ffmpeg, dan yt-dlp (mis. `winget install Git.Git OpenJS.NodeJS Gyan.FFmpeg yt-dlp.yt-dlp`),
   plus aplikasi Muse untuk Windows.
2. Clone repo ini ke `Documents\TERTORTOR MUSE`, lalu `npm install` dan `npx hyperframes skills` (skill HyperFrames ke `~/.agents/skills`).
3. `node tools/sfx.mjs`.
4. whisper.cpp untuk transkripsi suara: unduh `whisper-bin-x64.zip` dari github.com/ggml-org/whisper.cpp/releases, ekstrak
   sehingga ada `tools/bin/whisper/Release/whisper-cli.exe` (tidak ikut git).
5. Buat `.env` sendiri (tidak ikut git): `GEMINI_API_KEY` untuk thumbnail, caption, dan Library Cerita; opsional
   `ELEVENLABS_API_KEY` (suara ElevenLabs dan clone suara), `MUSE4AI_KEY` (gambar/klip Meta Muse lewat muse4ai). Kunci Tebar ditempel sendiri di panel Tebar halaman sub.
6. Shortcut Desktop dibuat otomatis oleh `npm install` (lihat di bawah); buat ulang dengan `npm run shortcut`.
7. `npm run studio` → http://localhost:4341.

Di Chrome, login sendiri ke Google Flow, Google AI Studio, dan RunningHub; Muse tidak mengetik password.

## Shortcut Desktop otomatis

`npm install` menyalakan git hook proyek (`core.hooksPath = .githooks`) lalu membuat shortcut **TERTORTOR MUSE** di
Desktop: `TERTORTOR MUSE.lnk` di Windows, `TERTORTOR MUSE.app` di Mac. Sesudah itu **setiap `git pull`** (biasa atau
`--rebase`) menjalankan `tools/shortcut.mjs` lewat `.githooks/post-merge` dan `post-rewrite`, jadi shortcut selalu ada
dan menunjuk ke folder ini. Shortcut menyalakan ulang Studio folder ini (kode terbaru) lalu membuka
http://localhost:4341; Studio TERTORTOR/LITE lain tidak disentuh. Matikan dengan `TERTORTOR_NO_SHORTCUT=1`.
Clone lama cukup menjalankan `npm install` sekali untuk menyalakan hook-nya.

## Yang tidak ikut git

Proyek `videos/` (render, suara, footage, key visual), klip `library/footage/`, audio stok `library/audio/`, kit
`library/sfx/`, video acuan pihak ketiga, `tools/bin/`, `.env`, `.tebar-keys.json`, clone suara (`library/voices/clones*`), dan token apa pun. Bila butuh proyek
lama, salin folder `videos/<slug>/` secara manual.

## Fitur yang butuh web (tidak aktif di MUSE)

Buka Studio dari HP, tombol "Bagikan" (`/v/<token>`), undangan user,
dan Web Push butuh relay (`tools/relay.mjs` + `npm run worker`). Kodenya masih ada, tapi MUSE sengaja tidak memakainya.
Bila suatu hari dibutuhkan: relay sendiri (bukan relay MOTION), `.env` dengan `RELAY_URL` + `RELAY_WORKER_TOKEN`, contoh
deploy di `deploy/studio/`, rincian di [docs/hybrid-plan.md](docs/hybrid-plan.md).
