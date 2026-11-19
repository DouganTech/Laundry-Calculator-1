# Daftar Fitur Produk — LaundryCalc

Aplikasi katalog layanan, kalkulator estimasi biaya laundry dengan aturan *minimum charge* 3 kg, serta pembuat format pesanan ke WhatsApp.

## Daftar Fitur

| Kode | Nama Fitur | Prioritas | Ketergantungan | Status |
| :--- | :--- | :--- | :--- | :--- |
| FT-01 | Tampilan Katalog & Durasi | Must Have | - | Selesai |
| FT-02 | Input Berat & Notifikasi Min. Charge | Must Have | FT-01 | Selesai |
| FT-03 | Opsi Add-on Terintegrasi | Must Have | FT-01, FT-02 | Selesai |
| FT-04 | Floating Price Summary | Must Have | FT-01, FT-02, FT-03 | Selesai |
| FT-05 | Form Data Pemesan | Must Have | FT-03 | Selesai |
| FT-06 | WhatsApp Deep Link Button | Must Have | FT-01, FT-02, FT-03, FT-04, FT-05 | Selesai |
| FT-07 | Info Jam Operasional Toko | Should Have | - | Selesai |

## Keputusan & Klarifikasi PRD

1. **Data toko & nomor WhatsApp**: Menggunakan data contoh dari Bagian 11 PRD (`Laundry UMKM`, nomor `628xxxxxxxxxx`) hingga pemilik toko mengganti ke nomor aktif pada konfigurasi.
2. **Format penulisan tarif**: Mengikuti gaya penulisan PRD (`Rp 6.000`, `Rp 18.000`) beserta pemisah desimal koma pada tampilan (`1,8 kg`, `4,5 kg`) dan menerima tanda koma maupun titik pada kolom input berat.
3. **Nilai awal input berat**: Dimulai dalam keadaan kosong agar pengguna memasukkan estimasi berat cucian sendiri.
4. **Cakupan rilis saat ini**: Seluruh fitur MVP dari **FT-01** hingga **FT-07** telah dispesifikasikan dan diimplementasikan.
