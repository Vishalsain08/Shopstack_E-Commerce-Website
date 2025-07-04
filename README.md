# 🛍️ ShopStack

**ShopStack** is a full-stack e-commerce web application built using the **MERN** stack. It features user authentication, product management, a shopping cart, and an admin dashboard for managing orders and products.

## 🔗 Live Demo

[👉 View Demo](https://shopstack-e-commerce-website.vercel.app/)  
_(Replace with your Vercel/Netlify/Render deployment URL)_

---

## 🚀 Tech Stack

**Frontend:** React, Tailwind CSS, Axios, React Router  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Auth:** JSON Web Tokens (JWT)  
**Deployment:** Vercel (frontend) + Render (backend) + MongoDB Atlas

---

## 📸 Screenshots

| Home Page | Admin Dashboard | Cart Page |
|----------|------------------|-----------|
| ![Home](./screenshots/home.png) | ![Admin](./screenshots/admin.png) | ![Cart](./screenshots/cart.png) |

> Add screenshots in a `/screenshots` folder in your repo

---

## 🔑 Features

### 👤 Authentication
- Register/Login with JWT
- Admin role detection and protection
- Protected routes

### 🛍️ User Features
- Browse product listings
- View product details
- Add to cart & checkout
- View order history

### 🛠️ Admin Features
- Create/Edit/Delete products
- View all customer orders
- Manage stock and price info

---

## 🧾 Models Overview

### 🧑 User
- `name`, `email`, `password`, `isAdmin`

### 📦 Product
- `name`, `description`, `price`, `category`, `image`

### 🧾 Order
- `user`, `orderItems`, `shippingAddress`, `totalPrice`

---

## 💻 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/shopstack.git
cd shopstack
