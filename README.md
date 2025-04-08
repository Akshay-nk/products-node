# 🛠️ Backend Developer Machine Test - Node.js, Express & MongoDB

This backend application is built using **Node.js**, **Express.js**, and **MongoDB**. It supports user authentication, brand and product management, a blocking/unblocking system, and secure token handling using access and refresh tokens.

---

## 📌 Features

### ✅ User Authentication & Profile Management
- Register and login with hashed passwords
- JWT Access Token (15 minutes) and Refresh Token (7 days)
- Refresh token system to get new access tokens
- Profile photo upload
- Edit/Delete own profile only

### ✅ Brand Management
- Add new brands with categories and logo
- Fetch all brands and their categories

### ✅ Product Management
- Add products linked to existing brands and valid categories
- Product image upload
- Edit/Delete only own products

### ✅ Blocking System
- Block or unblock users
- Blocked users can't view your products

### ✅ Product Viewing
- View all products (with sorting, filtering, and blocking restrictions)
- View only your own products

---

## 🧑‍💻 Tech Stack

| Tech         | Purpose                         |
|--------------|----------------------------------|
| Node.js      | Server runtime                  |
| Express.js   | Routing & middleware             |
| MongoDB      | Database                         |
| Mongoose     | ODM for MongoDB                  |
| JWT          | Token-based authentication       |
| bcrypt.js    | Password hashing                 |
| multer       | File/image upload handling       |
| cookie-parser| Parse cookies (refresh token)    |
| dotenv       | Environment variable management  |

---

## 📁 Folder Structure

├── config/ │ └── db.js ├── controllers/ ├── middleware/ ├── models/ ├── routes/ ├── utils/ ├── uploads/ ├── index.js ├── .env ├── .gitignore └── README.md


---

## ⚙️ Getting Started

### 1️⃣ Clone the Repo
```bash
git clone https://github.com/FathimaSanaTK/product_backend.git
cd backend-machine-test

2️⃣ Install Dependencies
bash

npm install

3️⃣ Run the Server

npm start