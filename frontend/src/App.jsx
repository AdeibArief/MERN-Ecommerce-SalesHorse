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

function App() {
  console.log("App is rendering"); // Check console

  return (
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
                <Route path="/checkout" element={<CheckOutPage />} />
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
  );
}

export default App;
