# 🛍️ ShopStack

**ShopStack** is a modern full-stack e-commerce web application built using the **MERN** stack. It features user authentication, product browsing, cart management, and a full admin dashboard to manage products and orders.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-%F0%9F%9A%80-blue?style=for-the-badge)](https://shopstack-e-commerce-website.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## 🔗 Live Demo

👉 **Frontend**: [https://shopstack-e-commerce-website.vercel.app](https://shopstack-e-commerce-website.vercel.app)  
👉 **Backend API**: [https://shopstack-backend.onrender.com/api/products](https://shopstack-backend.onrender.com/api/products)

---

## 🚀 Tech Stack

**Frontend:** React, Tailwind CSS, Axios, React Router  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Authentication:** JSON Web Tokens (JWT)  
**Deployment:** Vercel (Frontend), Render (Backend), MongoDB Atlas

---

## 📸 Screenshots

> Add images inside `/screenshots` folder and update paths below.

| Home Page | Admin Dashboard | Cart Page |
|-----------|------------------|-----------|
| ![Home](./screenshots/home.png) | ![Admin](./screenshots/admin.png) | ![Cart](./screenshots/cart.png) |

---

## 🔑 Features

### 👤 Authentication
- Register/Login using JWT
- Role-based access (Admin vs User)
- Protected routes and components

### 🛍️ User Functionality
- View product listings and details
- Add/remove items to cart
- Checkout and place orders
- View order history

### 🛠️ Admin Functionality
- Create, update, delete products
- View all user orders
- Manage stock, pricing, and inventory

---

## 🧾 Mongoose Models

### 👤 User
```js
{
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean
}
{
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String
}
