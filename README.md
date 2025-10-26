# To-Do Expo (Dark Mode) - Simple

Project minimal untuk tugas: To-Do List dengan dark mode menggunakan Expo (React Native).

## Isi project
- `App.js` - kode aplikasi (dark theme, tambah & hapus task, penyimpanan lokal).
- `app.json` - konfigurasi Expo.
- `package.json` - dependensi & script.
- `Dockerfile` - opsi menjalankan lewat Docker (dev server).
- `docker-compose.yml` - contoh compose.
- `README.md` - panduan ini.

## Cara run (VS Code)
1. Pastikan Node.js & Expo CLI terinstall:
   - `npm install -g expo-cli`
2. Install dependensi:
   - `npm install`
3. Jalankan:
   - `npm start`
4. Scan QR code dengan Expo Go (Android/iOS) atau jalankan di emulator `npm run android`.

## Cara run (Docker)
1. Build image:
   - `docker build -t todo-expo-dark .`
2. Jalankan:
   - `docker run -it -p 19000:19000 -p 19001:19001 -p 19002:19002 todo-expo-dark`
3. Buka URL yang diberikan oleh expo (biasanya http://localhost:19002).

Catatan: Untuk penggunaan emulator Android/iOS di dalam container butuh konfigurasi tambahan. Docker disediakan untuk kemudahan menjalankan dev server hanya.

