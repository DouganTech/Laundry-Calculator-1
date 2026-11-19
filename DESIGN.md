# Keputusan Desain — LaundryCalc

Dokumen ini mencatat pilihan desain yang telah disetujui pengguna serta token visual aplikasi.

## Keputusan Pengguna

- **Nama aplikasi**: LaundryCalc
- **Pengguna utama**: Calon pelanggan laundry rumahan/kost dan admin operasional laundry
- **Kesan visual**: Ramah dan hangat (`Plus Jakarta Sans`)
- **Warna aksen**: Biru (`blue`)
- **Sapaan untuk pengguna**: Anda
- **Susunan halaman**: Satu halaman bergulir pada ponsel dan dua kolom pada layar lebar
- **Posisi aksi utama**: Bilah ringkasan menempel di bawah layar (*sticky bottom bar*) pada ponsel dan panel ringkasan kanan pada desktop
- **Pilihan paket layanan**: Kartu radio (*radio card*)
- **Gambar**: Tanpa gambar dekoratif (fokus ke keterbacaan tarif, kalkulator, dan formulir)

## Token Visual & Tata Letak

- **Tipografi**: `@fontsource/plus-jakarta-sans` bobot 400, 500, dan 600, `tabular-nums` untuk seluruh nominal harga dan angka berat. Ukuran teks isi minimum 14 px, teks input minimum 16 px.
- **Permukaan & Warna**:
  - Latar halaman: `bg-neutral-50`
  - Panel & kartu: `bg-white`
  - Garis tepi input, tabel, dan pemisah: `border-neutral-200`
  - Teks utama: `text-neutral-900`
  - Teks pendukung: `text-neutral-600`
  - Placeholder: `text-neutral-500`
  - Tombol aksi utama: `bg-blue-700`, hover `hover:bg-blue-800`, teks `text-white`
  - Kartu / elemen terpilih: `border-blue-700 bg-blue-50`
  - Teks aksen: `text-blue-700`
  - Cincin fokus: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700`
  - Status informasi *minimum charge*: `bg-amber-50 text-amber-800 border-amber-200` dengan ikon dan teks label
  - Status error validasi: `text-red-700` / `bg-red-50 border-red-200 text-red-800` dengan ikon dan contoh perbaikan
- **Bentuk & Ruang**:
  - Sudut: kartu & panel `rounded-2xl`, tombol & input `rounded-xl`, penanda *badge* seperlunya `rounded-full`
  - Area sentuh interaktif minimum `44 × 44 px`
  - Tanpa gradasi, tanpa `backdrop-blur`, tanpa kartu di dalam kartu, tanpa garis tepi kiri tebal, dan tanpa elemen dekoratif statis.
