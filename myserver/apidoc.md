API Documentation for Rental Mobil
Base URL
bash

http://localhost:3000/api
Authentication Routes
1. Register User/Admin
Endpoint: /auth/register
Method: POST
Description: Mendaftarkan user baru (user atau admin)
Request Body:
json

{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string"  // Optional, defaults to "user". Can be "admin"
}
Response:
json

{
  "message": "User registered successfully",
  "user": {
    "id": "integer",
    "username": "string",
    "email": "string",
    "role": "string"
  }
}
2. Login User/Admin
Endpoint: /auth/login
Method: POST
Description: Melakukan login dengan email dan password
Request Body:
json

{
  "email": "string",
  "password": "string"
}
Response:
json

{
  "message": "Login Successful",
  "token": "string"
}
3. Admin Access Check
Endpoint: /auth/admin
Method: GET
Description: Cek apakah user adalah admin (hanya untuk admin)
Headers: Authorization: Bearer {token}
Response:
json

{
  "message": "Welcome Admin, you have access!"
}
4. User Access Check
Endpoint: /auth/user
Method: GET
Description: Cek apakah user adalah user biasa (user atau admin)
Headers: Authorization: Bearer {token}
Response:
json

{
  "message": "Welcome {username}, you have access!"
}
User Management Routes (Admin Only)
1. Get All Users
Endpoint: /users
Method: GET
Description: Mendapatkan daftar semua pengguna (hanya admin)
Headers: Authorization: Bearer {token}
Response:
json

[
  {
    "id": "integer",
    "username": "string",
    "email": "string",
    "role": "string",
    "blacklisted": "boolean"
  }
]
2. Get User by ID
Endpoint: /users/:id
Method: GET
Description: Mendapatkan informasi pengguna berdasarkan ID (hanya admin)
Headers: Authorization: Bearer {token}
Response:
json

{
  "id": "integer",
  "username": "string",
  "email": "string",
  "role": "string",
  "blacklisted": "boolean"
}
3. Update User Info
Endpoint: /users/:id
Method: PUT
Description: Memperbarui informasi pengguna (admin bisa memperbarui semua pengguna, user bisa memperbarui dirinya sendiri)
Headers: Authorization: Bearer {token}
Request Body:
json

{
  "username": "string",  // Optional
  "email": "string",     // Optional
  "password": "string"   // Optional
}
Response:
json

{
  "message": "User updated successfully",
  "user": {
    "id": "integer",
    "username": "string",
    "email": "string"
  }
}
4. Blacklist User
Endpoint: /users/blacklist/:id
Method: PUT
Description: Mem-blacklist pengguna (hanya admin)
Headers: Authorization: Bearer {token}
Response:
json

{
  "message": "User blacklisted successfully"
}
5. Delete User
Endpoint: /users/:id
Method: DELETE
Description: Menghapus pengguna berdasarkan ID (hanya admin)
Headers: Authorization: Bearer {token}
Response:
json

{
  "message": "User deleted successfully"
}
Car Management Routes
1. Get All Cars
Endpoint: /cars
Method: GET
Description: Mendapatkan daftar semua mobil rental yang tersedia
Headers: Authorization: Bearer {token} (Optional for public access)
Response:
json

[
  {
    "id": "integer",
    "name": "string",
    "brand": "string",
    "type": "string",
    "price_per_day": "integer",
    "available": "boolean"
  }
]
2. Get Car by ID
Endpoint: /cars/:id
Method: GET
Description: Mendapatkan detail mobil rental berdasarkan ID
Headers: Authorization: Bearer {token} (Optional for public access)
Response:
json

{
  "id": "integer",
  "name": "string",
  "brand": "string",
  "type": "string",
  "price_per_day": "integer",
  "available": "boolean"
}
3. Add New Car (Admin Only)
Endpoint: /cars
Method: POST
Description: Admin menambah mobil baru untuk rental
Headers: Authorization: Bearer {token}
Request Body:
json

{
  "name": "string",
  "brand": "string",
  "type": "string",
  "price_per_day": "integer"
}
Response:
json

{
  "message": "Car added successfully",
  "car": {
    "id": "integer",
    "name": "string",
    "brand": "string",
    "type": "string",
    "price_per_day": "integer"
  }
}
4. Update Car Information (Admin Only)
Endpoint: /cars/:id
Method: PUT
Description: Admin memperbarui detail mobil
Headers: Authorization: Bearer {token}
Request Body:
json

{
  "name": "string",       // Optional
  "brand": "string",      // Optional
  "type": "string",       // Optional
  "price_per_day": "integer", // Optional
  "available": "boolean"  // Optional
}
Response:
json

{
  "message": "Car updated successfully"
}
5. Delete Car (Admin Only)
Endpoint: /cars/:id
Method: DELETE
Description: Admin menghapus mobil rental
Headers: Authorization: Bearer {token}
Response:
json

{
  "message": "Car deleted successfully"
}
Notes:
Authorization: Untuk endpoint yang membutuhkan autentikasi, header Authorization harus dikirimkan seperti ini: Authorization: Bearer {token}.
Error Handling: Setiap endpoint akan mengembalikan pesan kesalahan dalam format JSON seperti {"message": "error message"} jika terjadi kesalahan.