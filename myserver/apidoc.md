# Dokumentasi API Rental Mobil

## 1. Registrasi Pengguna

### Endpoint

POST /api/auth/register


### Deskripsi
Endpoint ini digunakan untuk mendaftar pengguna baru.

### Body Request
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string" // Optional, default: "user"
}

Respons
201 Created: Pengguna berhasil didaftarkan.

{
  "message": "User registered successfully",
  "user": {
    "id": "integer",
    "username": "string",
    "email": "string",
    "role": "string"
  }
}

500 Internal Server Error: Terjadi kesalahan saat mendaftar.

2. Login Pengguna

Endpoint

POST /api/auth/login

Deskripsi
Endpoint ini digunakan untuk login pengguna dan mendapatkan token akses.

Body Request

{
  "email": "string",
  "password": "string"
}

Respons
200 OK: Login berhasil dan token diberikan.

{
  "message": "Login successful",
  "token": "string",
  "user": {
    "id": "integer",
    "username": "string",
    "email": "string",
    "role": "string"
  }
}

401 Unauthorized: Kredensial tidak valid.
404 Not Found: Pengguna tidak ditemukan atau di-blacklist.

3. Mendapatkan Profil Pengguna

Endpoint

GET /api/users/profile

Deskripsi
Endpoint ini digunakan untuk mendapatkan informasi profil pengguna yang sedang login.

Header
Authorization: Bearer YOUR_ACCESS_TOKEN

Respons
200 OK: Mengembalikan profil pengguna.

{
  "user": {
    "id": "integer",
    "username": "string",
    "email": "string",
    "role": "string",
    "blacklisted": "boolean"
  }
}

401 Unauthorized: Token tidak valid.


4. Menambah Mobil (Hanya Admin)

Endpoint
POST /api/cars/add

Deskripsi
Endpoint ini digunakan untuk menambah mobil baru ke dalam daftar.

Header
Authorization: Bearer YOUR_ADMIN_TOKEN

Body Request
{
  "name": "string",
  "brand": "string",
  "type": "string",
  "price_per_day": "integer"
}

Respons
201 Created: Mobil berhasil ditambahkan.

{
  "message": "Car added successfully"
}

403 Forbidden: Akses ditolak, hanya admin yang bisa menambah mobil.
500 Internal Server Error: Terjadi kesalahan saat menambah mobil.

5. Mendapatkan Daftar Mobil

Endpoint
GET /api/cars

Deskripsi
Endpoint ini digunakan untuk mendapatkan daftar semua mobil.

Header
Authorization: Bearer YOUR_ACCESS_TOKEN

Respons
200 OK: Mengembalikan daftar mobil.

{
  "cars": [
    {
      "id": "integer",
      "name": "string",
      "brand": "string",
      "type": "string",
      "price_per_day": "integer"
    }
  ]
}

401 Unauthorized: Token tidak valid.

6. Menghapus Mobil (Hanya Admin)
Endpoint

DELETE /api/cars/delete/:id

Deskripsi
Endpoint ini digunakan untuk menghapus mobil berdasarkan ID.

Header

Authorization: Bearer YOUR_ADMIN_TOKEN

Respons
200 OK: Mobil berhasil dihapus.

{
  "message": "Car deleted successfully"
}

403 Forbidden: Akses ditolak, hanya admin yang bisa menghapus mobil.
404 Not Found: Mobil tidak ditemukan.
500 Internal Server Error: Terjadi kesalahan saat menghapus mobil.

7. Menghapus Pengguna (Hanya Admin)
Endpoint

DELETE /api/users/:id

Deskripsi
Endpoint ini digunakan untuk menghapus pengguna berdasarkan ID.

Header

Authorization: Bearer YOUR_ADMIN_TOKEN

Respons
200 OK: Pengguna berhasil dihapus.

{
  "message": "User deleted successfully"
}

403 Forbidden: Akses ditolak, hanya admin yang bisa menghapus pengguna.
404 Not Found: Pengguna tidak ditemukan.
500 Internal Server Error: Terjadi kesalahan saat menghapus pengguna.


### Cara Melihat Dokumentasi dengan Rapi
- **Markdown Preview**: Jika Anda menggunakan editor yang mendukung Markdown, seperti VSCode, Anda dapat membuka file Markdown dan menggunakan fitur preview untuk melihat formatnya dengan baik.
- **Static Site Generators**: Anda dapat menggunakan generator situs statis seperti Jekyll atau Hugo untuk menghasilkan situs web dari dokumentasi Markdown Anda.
- **Dokumentasi API Tools**: Anda juga bisa menggunakan alat seperti Swagger atau Postman untuk mendokumentasikan API dan menghasilkan antarmuka pengguna interaktif.