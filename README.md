# Ringkasan Perubahan

Dokumen ini merangkum perubahan yang telah dilakukan pada file proyek Saya, serta fitur mendatang dan ide tambahan untuk meningkatkan portofolio web Saya.

## 1. Perubahan yang Telah Dilakukan

Perubahan dengan fokus pada peningkatan tata letak, profesionalisme, dan responsivitas.

### 1.1. Proyek "Dancing LED" (`dancing-led.html`)

| Aspek | Perubahan | Tujuan |
| :--- | :--- | :--- |
| **Tata Letak** | Diubah menjadi tata letak dua kolom (konten utama dan *sidebar*) untuk tampilan PC/Tablet. | Menciptakan tata letak yang lebih simetris, profesional, dan terstruktur. |
| **Responsivitas** | Tata letak dua kolom otomatis berubah menjadi satu kolom pada perangkat seluler (HP). | Memastikan pengalaman pengguna yang optimal dan enak dipandang di semua ukuran layar. |
| **Struktur Konten** | Informasi penting seperti ringkasan proyek, spesifikasi teknis, dan saran fitur mendatang dipindahkan ke *sidebar* yang *sticky* (menempel saat *scroll* di PC). | Meningkatkan keterbacaan dan akses cepat ke informasi kunci. |
| **Estetika** | Menggunakan variabel CSS (`var(--...)`) dari `style.css` untuk warna, *spacing*, dan *shadow* agar konsisten dengan gaya portofolio utama. | Mempertahankan *style* portofolio yang profesional dan modern. |

### 1.2. Portofolio Utama (`index.html` dan `style.css`)

| Aspek | Perubahan | Tujuan |
| :--- | :--- | :--- |
| **Section Baru** | Penambahan **Section Certificates** (`#certificates`) sebelum *Contact Section*. | Memenuhi permintaan untuk menampilkan sertifikat secara terpisah dan profesional. |
| **Navigasi** | Penyesuaian **Navbar** dan **Footer** untuk menyertakan tautan ke `#certificates`. | Memastikan aksesibilitas yang mudah ke section baru di seluruh situs. |
| **Styling** | Penambahan *styling* khusus untuk `certificates-grid` dan `certificate-card` di `assets/css/style.css`. | Memastikan tampilan kartu sertifikat yang profesional, responsif, dan konsisten dengan desain kartu proyek/skill yang sudah ada. |

---

## 2. Fitur Mendatang (Upcoming Features)

Berikut adalah saran fitur Saya pertimbangkan untuk ditambahkan ke proyek "Dancing LED" dan portofolio secara umum.

### 2.1. Untuk Proyek "Dancing LED"

Fitur-fitur ini akan meningkatkan nilai teknis proyek dan menunjukkan kemampuan Saya dalam integrasi IoT yang lebih kompleks.

| Fitur | Deskripsi | Manfaat |
| :--- | :--- | :--- |
| **Kontrol Nirkabel (Web/App)** | Implementasi *web server* sederhana pada ESP8266 atau integrasi dengan platform IoT (misalnya, Blynk, Node-RED) untuk mengontrol pola dan kecepatan LED dari *browser* atau aplikasi seluler. | Mendemonstrasikan keahlian dalam **IoT, *Web Server*, dan *Real-time Control***. Menjadikan proyek lebih interaktif. |
| **Mode Musik (Sound Reactive)** | Menambahkan sensor suara (mikrofon) untuk membuat pola LED bereaksi terhadap irama atau volume musik. | Menunjukkan keahlian dalam **Pemrosesan Sinyal Analog/Digital** dan **Integrasi Sensor**. |
| **Video Demonstrasi** | Mengganti atau melengkapi gambar statis dengan video singkat (sekitar 15-30 detik) yang menunjukkan proyek "Dancing LED" sedang beroperasi. | Meningkatkan daya tarik visual dan memberikan bukti fungsionalitas proyek secara langsung. |
| **Tautan GitHub** | Menyediakan tautan langsung ke repositori GitHub yang berisi kode sumber lengkap (Arduino Sketch). | Menunjukkan **Transparansi Kode** dan **Keterampilan Dokumentasi** yang baik. |

### 2.2. Untuk Portofolio Web (Umum)

Ide-ide ini akan meningkatkan pengalaman pengguna dan profesionalisme portofolio Saya.

| Ide Tambahan | Deskripsi | Manfaat |
| :--- | :--- | :--- |
| **Fitur *Dark/Light Mode*** | Menambahkan tombol untuk beralih antara tema gelap (saat ini) dan tema terang. | Meningkatkan **Aksesibilitas** dan **Pengalaman Pengguna** (UX) dengan memberikan pilihan personalisasi. |
| **Filter Proyek** | Jika jumlah proyek bertambah, tambahkan filter (misalnya, "IoT", "Web Dev", "Network") pada *Projects Section*. | Memudahkan pengunjung untuk menemukan proyek yang relevan dengan minat mereka, menunjukkan **Keterampilan Frontend** yang terorganisir. |
| **Optimasi Gambar Sertifikat** | Menggunakan format gambar modern (seperti WebP) dan memastikan ukuran file sekecil mungkin tanpa mengorbankan kualitas. | Meningkatkan **Kecepatan Muat** (Page Speed) situs, yang penting untuk SEO dan UX. |
| **Animasi *Scroll* Ringan** | Menambahkan animasi sederhana (misalnya, *fade-in* atau *slide-up*) pada setiap *section* saat di-*scroll* untuk memberikan kesan dinamis dan modern. | Meningkatkan **Estetika** dan **Keterlibatan Pengguna** (Engagement). |
