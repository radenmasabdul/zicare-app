# 🌐 Zi.Care Fullstack Engineer Technical Test – Frontend Web Developer

Aplikasi ini merupakan implementasi frontend untuk kebutuhan **technical test** Fullstack Engineer Zi.Care. Dibangun menggunakan **Svelte**, aplikasi ini menangani proses CRUD (Create, Read, Update, Delete) untuk data sensor kualitas udara.

## 🚀 Tech Stack

| Teknologi               | Deskripsi                                                                 |
|-------------------------|---------------------------------------------------------------------------|
| 🧡 **Svelte**            | Framework JavaScript ringan untuk membangun SPA                          |
| ⚡ **Vite**              | Build tool super cepat untuk development dan production                   |
| 🎨 **DaisyUI + TailwindCSS** | Framework UI berbasis utility class untuk styling yang konsisten dan cepat |
| 🧭 **Svelte SPA Router** | Routing client-side berbasis hash untuk navigasi halaman                  |
| 🍭 **SweetAlert2**       | Notifikasi pop-up interaktif dan modern                                   |
| 🕒 **Moment.js**         | Untuk formatting dan parsing tanggal                                      |
| ⚙️ **Axios**             | HTTP client untuk komunikasi dengan API eksternal                         |
| 🎨 **Lucide Icons**      | Icon SVG open-source yang mudah digunakan                                |

## 📂 Struktur Proyek
```
├── .vscode/ # Konfigurasi editor (opsional)
├── auth/ # Folder otentikasi (jika ada)
├── node_modules/ # Dependency project
├── public/ # File statis publik
├── src/ # Sumber utama aplikasi
│ ├── assets/ # Gambar dan aset lainnya
│ ├── components/ # Komponen UI global
│ │ ├── layout/ # Komponen layout (Navbar, Drawer, dll)
│ │ │ ├── Content.svelte
│ │ │ ├── Drawer.svelte
│ │ │ └── Navbar.svelte
│ │ ├── Button.svelte
│ │ ├── DataTable.svelte
│ │ ├── Export.svelte
│ │ ├── Filter.svelte
│ │ ├── Modal.svelte
│ │ ├── Pagination.svelte
│ │ └── SearchBox.svelte
│ ├── hooks/ # Custom hooks (mis. useLogin)
│ │ └── useLogin.js
│ ├── layouts/ # Layout utama aplikasi
│ │ └── Layout.svelte
│ ├── pages/ # Halaman aplikasi
│ │ ├── auth/
│ │ │ ├── Login.svelte
│ │ │ └── LoginForm.svelte
│ │ ├── dashboard/
│ │ │ └── Dashboard.svelte
│ │ ├── sensor/
│ │ │ ├── SensorForm.svelte
│ │ │ └── SensorList.svelte
│ │ ├── settings/
│ │ │ └── Setting.svelte
│ │ └── user/
│ │ └── UserList.svelte
│ ├── routes/ # Konfigurasi routing
│ │ ├── LayoutRoutes.js
│ │ └── router.js
│ ├── stores/ # State global (store Svelte)
│ │ ├── auth.js
│ │ ├── sensor.js
│ │ └── user.js
│ ├── styles/ # Styling global
│ │ └── app.css
│ ├── utils/ # Fungsi pembantu dan API client
│ │ ├── endpoint/
│ │ │ ├── auth.js
│ │ │ ├── sensor.js
│ │ │ └── user.js
│ │ ├── helpers/
│ │ │ └── queryClient.js
│ │ └── services/
│ │ └── api.js
│ ├── App.svelte # Root komponen Svelte
│ ├── main.js # Entry point aplikasi
│ └── vite-env.d.ts # Tipe untuk environment Vite
├── .env # Variabel environment
├── .gitignore # Daftar file yang diabaikan Git
├── index.html # HTML utama
├── jsconfig.json # Konfigurasi path/module JS
├── package-lock.json # Lock file NPM
├── package.json # Metadata dan dependency project
├── readme.md # Dokumentasi proyek
├── svelte.config.js # Konfigurasi Svelte
└── vite.config.js # Konfigurasi Vite
```

## 📌 Api Reference
```
API eksternal digunakan, silakan hubungi author untuk informasi lebih lanjut.
```

## 🛠️ Cara Menjalankan Proyek

1. **Clone repository ini:**
   ```bash
   git clone https://github.com/radenmasabdul/zicare-app.git
   cd zicare-app
   ```

2. **Install dependency:**
   ```bash
   npm install
   ```

3. **Buat file .env :**
   ```
   bisa hubungi pemilik
   ```

4. **Jalankan proyek di mode development:**
   ```bash
   npm run dev
   ```

5. **Buka aplikasi di browser:**
   Kunjungi [http://localhost:5173](http://localhost:5173)

## ☁️ Deployment
```
https://zicare-app.vercel.app/
```
## 📄 License
Proyek ini dibuat untuk keperluan technical test. Bebas digunakan secara pribadi atau edukasi, tidak untuk komersial.
