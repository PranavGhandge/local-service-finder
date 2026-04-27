# 🚀 Local Service Finder + Booking System

A backend system built using **Node.js + Fastify + MySQL + TypeScript**
It allows users to book local services and providers to manage bookings.

---

# 📌 Features

* 🔐 JWT Authentication (User / Provider)
* 🔑 OTP आधारित Password Reset
* 🛠 Service Management
* 📅 Booking System
* 🔔 Notification System (DB आधारित)

---

# ⚙️ Tech Stack

* Node.js
* Fastify
* MySQL
* TypeScript

---

# 📁 Base URL

```
http://localhost:3000/api
```

---

# 🔐 AUTH APIs

## 1. Register

```
POST /users/register
```

### Body:

```json
{
  "name": "Test User",
  "email": "user@test.com",
  "password": "123456",
  "role": "user"
}
```

---

## 2. Login

```
POST /users/login
```

### Body:

```json
{
  "email": "user@test.com",
  "password": "123456"
}
```

### Response:

```json
{
  "token": "JWT_TOKEN"
}
```

---

# 🔐 OTP APIs

## 3. Send OTP

```
POST /auth/send-otp
```

### Body:

```json
{
  "email": "user@test.com"
}
```

---

## 4. Verify OTP

```
POST /auth/verify-otp
```

### Body:

```json
{
  "email": "user@test.com",
  "otp": "123456"
}
```

---

## 5. Reset Password

```
POST /auth/reset-password
```

### Body:

```json
{
  "email": "user@test.com",
  "password": "newpassword"
}
```

---

# 🛠 SERVICE APIs

## 6. Create Service (Provider only)

```
POST /services
```

### Headers:

```
Authorization: Bearer PROVIDER_TOKEN
```

### Body:

```json
{
  "title": "Plumbing",
  "description": "Fix pipes"
}
```

---

## 7. Get All Services

```
GET /services
```

---

# 📅 BOOKING APIs

## 8. Create Booking (User only)

```
POST /bookings
```

### Headers:

```
Authorization: Bearer USER_TOKEN
```

### Body:

```json
{
  "service_id": 1,
  "date": "2026-05-01 10:00:00"
}
```

---

## 9. Update Booking Status (Provider)

```
PUT /bookings/:bookingId/status
```

### Headers:

```
Authorization: Bearer PROVIDER_TOKEN
```

### Body:

```json
{
  "status": "confirmed"
}
```

---

# 🔔 NOTIFICATION APIs

## 10. Get Notifications

```
GET /notifications
```

### Headers:

```
Authorization: Bearer TOKEN
```

---

## 11. Unread Count

```
GET /notifications/unread-count
```

---

## 12. Mark as Read

```
PUT /notifications/:id/read
```

---

# 🧪 Testing Flow

1. Register User & Provider
2. Login (get tokens)
3. Provider → Create Service
4. User → Book Service
5. Provider → Confirm Booking
6. Check Notifications

---

# ⚠️ Notes

* Passwords are hashed using bcrypt
* OTP expires in 5 minutes
* Notifications stored in DB

---

# 📌 Future Improvements

* Email Notifications
* Real-time notifications (Socket.io)
* Payment Integration

---

# 👨‍💻 Author

Pranav Ghandge
