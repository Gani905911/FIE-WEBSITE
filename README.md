
# FRIENDS-Restaurant 🍲

A modern, frontend-only React application for **FRIENDS-Restaurant**. This project allows customers to browse a menu, add items to a cart, order with a table number, and includes a Chef Dashboard for viewing orders.

## 🚀 Features

- **Beautiful UI/UX**: Glassmorphism, premium colors (Warm Orange & Deep Red), and smooth animations using Framer Motion.
- **Menu Management**: Categorized menu (Tiffins, Lunch, Dinner) with search functionality.
- **Cart System**: Add items, update quantities, real-time price calculation with tax.
- **Authentication (Dummy)**:
  - **Customer Login**: Phone number & OTP.
  - **Chef Login**: Special access to the Kitchen Dashboard.
- **Chef Dashboard**: Real-time view of incoming orders with "Mark as Prepared" functionality.
- **Secure Checkout**: Dummy payment verification flow.

## 🛠 Tech Stack

- **React.js** (Vite)
- **Tailwind CSS** (Styling)
- **Framer Motion** (Animations)
- **Lucide React** (Icons)
- **Context API** (State Management)
- **React Router DOM** (Navigation)

## 📦 How to Run

1.  **Install Dependencies** (if you haven't already):
    ```bash
    npm install
    ```

2.  **Start the Development Server**:
    ```bash
    npm run dev
    ```

3.  **Open in Browser**:
    Visit `http://localhost:5173` (or the port shown in your terminal).

## 🔑 Login Credentials

### Customer Login
- **Phone**: Any 10-digit number (e.g., `1234567890`)
- **OTP**: `1234`

### Chef / Kitchen Staff Login
- **Phone**: `999`
- **OTP**: `1234`
- **Role**: Select "Kitchen Staff" on the login page.

## 📱 Pages Overview

1.  **Home**: Landing page with Hero section and Food Menu.
2.  **Cart**: Review your order, update quantities, and enter Table Number.
3.  **Payment**: Dummy payment gateway to confirm order amount.
4.  **Order Success**: Confirmation screen with order summary.
5.  **Chef Dashboard**: Exclusive page for kitchen staff to manage orders.

## 📂 Project Structure

- `src/components`: Reusable UI components (Navbar, FoodCard, etc.)
- `src/context`: Global state management (Auth, Cart).
- `src/data`: Static menu data.
- `src/pages`: Main application pages.
- `src/styles`: Custom CSS and Tailwind configuration.

Enjoy the food! 🥘
