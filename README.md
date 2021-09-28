# SekolahYuk
SekolahYuk adalah Aplikasi Pembelajaran Online untuk sekolah2 di Indonesia. Dimana Guru bisa memberikan tugas, soal ujian, dan murid bisa mengerjakan tugas serta soal2 nya.

Dibuat dengan :
- MongoDB
- ExpressJS
- ReactJS
- NodeJS

Fitur Lengkap Aplikasi :

- Guru bisa memberikan tugas / soal ujian
- Guru bisa membuat grup, yang dimana nanti para murid bisa masuk ke grup tersebut
- Guru juga bisa memberikan materi berupa file PDF, Foto Gambar, DLL ke grup yang sudah dibuat
- Guru bisa mengunduh hasil nilai para muridnya ke dalam bentuk excel
- Ketika murid selesai mengerjakan soal ujian, nilai otomatis akan keluar
- Ketika murid selesai mengerjakan Tugas, Guru bisa memberikan Nilai Kepada muridnya sesuai Maksimum Nilai yg diberikan saat membuat tugas tersebut

Oiya, Di Aplikasi ini saya juga menambahkan fitur Rekam Gambar dan Audio saat ujian sedang berlangsung ( modelnya kaya autoproton gitu lahh kwkwkwk )

Jadi guru bisa mengaktifkan fitur tersebut saat membuat soal ujian.

Demo Akun Admin :
Email : admin@sekolahyuk.id
Password : sekolahyukapp

Demo Akun Guru :
Email : guru@gmail.com
Password : iniakunguru

Demo Akun Murid :
Email : murid@gmail.com
Password : iniakunmurid

## Demo SekolahYuk
https://sekolahyuk-app.herokuapp.com

## Cara Installnya Gimana Ngab ?

Ikuti Step by step nya satu2 yaaaa :)

### 1) Clone Repo Ini, Atau Download Source Codenya
```
git clone https://github.com/ZSofttt/SekolahYuk.git
```

### 2) Ganti Direktorinya
```
cd SekolahYuk
```
### 3) Install Dependencies
```
npm i
```

### 4) Ganti Direktorinya Lagi
```
cd client
```
### 5) Lalu Install Dependencies nya lagi
```
npm i
```

### 6) Setting MongoDB

Untuk Menyetting MongoDB, kalian buka file index.js di direktori awal, lalu kalian cari syntax berikut :

```js
const MONGO_URI = "TARUH URL MONGO_DB DISINI GAYS"
```
Setelah itu kalian taruh URL nya dibagian situ

### 7) Setting JWT ( Json Web Token )

Untuk Menyetting JWT, kalian buka dua jenis folder, yaitu middleware/auth.js, juga routes/login.js, nah nanti disitu kalian akan menemukan syntax berikut ini :

```js
const jwtPrivateKey  = "KETIK KATA APA SAJA"
```
Lalu kalian beri privatekey semau kalian

### 8) Setting Sendgrid Apikey Serta Email

Untuk Menyetting Apikey Sendgrid, kalian buka folder services/sendMail.js, nah nanti disitu kalian akan menemukan syntax berikut ini :

```js
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: "TARUH APIKEY DISINI",
    },
```
Lalu untuk menyetting Email Sendgrid, Kalian Scroll Kebawah, Lalu kalian akan menemukan syntax berikut ini :

```js
let sendMail = (toId, sub, text) => {
  return transporter.sendMail({
    to: toId,
    from: "TARUH EMAIL YG TERDAFTAR DI SENDGRID DISINI",
    subject: sub,
    html: `<h4>${text}</h4>`,
  });
};
```

### 9) Membuat Akun Admin Serta Menyettingnya

Untuk Membuat akun admin, kalian buka file index.js di root folder, lalu
panggil createadmin function:

```
createadmin();
```
Untuk custom akun admin, silakan kalian buka folder services/createAdmin.js, lalu ganti di kode berikut ini :

```js
var createadmin = async () => {
  const user = new User({
    name: "admin",
    password: "sekolahyukapp",
    email: "admin@sekolahyuk.id",
    category: "ADMIN",
  });
```

### 10) Jalani Server

Buka Console NodeJS kalian, lalu ketik:
```
npm start
```

Buka browser kamu, lalu masuk ke:
http://localhost:3000/

## Catatan
Ini adalah Project Free & Open Source, Jika Kalian Ingin Menggunakannya Untuk Kepentingan Pribadi / Komersil, Boleh Saja, Asal Kalian Mencantumkan Kredit

## CREDITS
- Zahir Hadi Athallah

## Donate For Support This Project :)
https://saweria.co/zsoft


