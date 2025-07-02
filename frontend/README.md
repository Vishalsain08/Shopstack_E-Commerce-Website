# 🛒 ShopStack Frontend Checklist

This is the frontend development checklist for the **ShopStack** e-commerce web app built with React, Tailwind CSS, and Express (MERN stack).

---

## ✅ Core Setup
- [x] Initialize React project with Tailwind CSS
- [x] Set up React Router (react-router-dom)
- [x] Create basic folder structure:
  - `/components`
  - `/pages`
  - `/context` (or `/store` if using Redux)
  - `/assets` (for images/icons)

---

## 🧭 Navigation - `Navbar.jsx`
- [x] Add logo/title
- [ ] Navigation links: Home, Cart, Login/Register or Profile
- [ ] Cart icon with dynamic item count

---

## 🏠 Home Page (`/`)
- [x] Fetch products from backend API (`GET /api/products`)
- [x] Create `ProductCard.jsx` component
  - [x] Show product image, name, and price
  - [ ] Hover zoom-out effect using Tailwind
  - [ ] Add to Cart button
- [ ] Display all products in a responsive grid

---

## 🛒 Cart Page (`/cart`)
- [ ] Create `CartPage.jsx`
- [ ] Store cart items using React Context or Redux
- [ ] Display added items:
  - Product image, name, price
  - Quantity selector
  - Remove item button
- [ ] Show subtotal and total price
- [ ] "Proceed to Checkout" button

---

## 📦 Product Details Page (`/product/:id`)
- [ ] Create `ProductPage.jsx`
- [ ] Fetch and display full product details
  - Image, name, description, price
- [ ] Add to Cart button

---

## 🔐 Authentication Pages
- [ ] `LoginPage.jsx` and `RegisterPage.jsx`
- [ ] Validate inputs and show errors
- [ ] Store JWT token in localStorage
- [ ] Display profile/logout in navbar when logged in

---

## 👨‍💼 Admin Features
- [ ] `AdminDashboard.jsx` (or `/admin/products`)
- [ ] List all products with Edit/Delete buttons
- [ ] Add Product form
- [ ] Edit Product form (prefill values)
- [ ] Delete product functionality
- [ ] Protect admin routes using `isAdmin` flag

---

## 💰 Checkout Page (`/checkout`)
- [ ] Create `CheckoutPage.jsx`
- [ ] Show cart/order summary
- [ ] Mock shipping details form
- [ ] Place Order (create order in DB via POST API)

---

## 🧠 State Management
- [ ] Create `CartContext` or use Redux for cart
- [ ] Persist cart in localStorage
- [ ] Create `AuthContext` or Redux slice for auth
- [ ] Use `useContext` or `useSelector` throughout app

---

## 💄 UI Enhancements & Polishing
- [ ] Responsive design for mobile & tablet
- [ ] Use `react-icons` or `lucide-react` for icons
- [ ] Toast messages for cart, login, errors (`react-hot-toast`)
- [ ] Profile picture on navbar (if logged in)
- [ ] Add transitions/animations with `framer-motion` (optional)

---

## 📁 Folder Suggestions
