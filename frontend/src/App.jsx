import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import ProductCard from "./components/ProductCard";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import CheckOutPage from "./pages/CheckOut";
import Cart from "./components/Cart";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";

function App() {
  console.log("App is rendering"); // Check console

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Toaster />

          <div className="drawer drawer-end">
            <input id="cart-drawer" type="checkbox" className="drawer-toggle" />

            {/* PAGE CONTENT */}
            <div className="drawer-content flex flex-col min-h-screen">
              <Navbar />

              <main className="">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <CheckOutPage />
                      </ProtectedRoute>
                    }
                  />
                  // Add routes:
                  <Route
                    path="/orders"
                    element={
                      <ProtectedRoute>
                        <Orders />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/order/:id"
                    element={
                      <ProtectedRoute>
                        <OrderDetail />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              <Footer />
            </div>

            {/* 🔥 CART DRAWER */}
            <div className="drawer-side">
              <label htmlFor="cart-drawer" className="drawer-overlay"></label>
              <Cart />
            </div>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-error mb-4">404</h1>
        <p className="text-2xl mb-8">Page Not Found</p>
        <a href="/" className="btn btn-primary">
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default App;
