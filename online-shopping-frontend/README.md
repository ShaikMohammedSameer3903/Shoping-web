# Online Shopping — Vite + React Frontend

A clean, scalable React frontend for an online shopping platform. Designed to pair with a Spring Boot + MySQL backend. Includes optional mock mode so you can run the UI without a backend.

## Features
- Product browsing, search, detail page
- Cart with quantity updates and totals
- Auth flows (login/register) with JWT token storage
- Protected routes (orders, profile, checkout)
- Seller dashboard placeholder
- Service layer aligned with typical Spring Boot endpoints
- `.env`-driven base URL and mock mode

## Getting Started
```bash
npm install
cp .env.example .env           # edit if needed
npm run dev
```

- Mock mode is enabled by default (`VITE_USE_MOCKS=true`). Set to `false` once your Spring Boot API is ready.
- API base URL defaults to `http://localhost:8080/api`. Change `VITE_API_BASE_URL` in `.env` if needed.

## Planned Backend Endpoints (Spring Boot)
- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET /api/products`, `GET /api/products/{id}`
- `GET/POST/PUT/DELETE /api/cart`, `POST /api/cart/checkout`
- `GET /api/orders`, `POST /api/orders`
- `GET/POST /api/wishlist`
- `GET/POST /api/seller/products`, `GET /api/seller/orders`

## Project Structure
```
src/
  components/         # Navbar, Footer, ProductCard, ProtectedRoute
  context/            # AuthContext, CartContext
  pages/              # Home, Products, ProductDetail, Cart, Wishlist, Checkout, Orders, Profile, Login, Register, SellerDashboard
  services/           # api.js, productService.js, authService.js, orderService.js
  hooks/              # useFetch
  assets/             # logo
public/mock/          # mock JSON data
```
