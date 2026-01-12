import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { getCartCount } = useCart();

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-primary font-bold text-2xl">
          🛍️ SalesHorse
        </Link>
      </div>
      <div className="navbar-end gap-2">
        <Link to="/" className="btn btn-ghost">
          Home
        </Link>

        <Link to="#products" className="btn btn-ghost">
          Products
        </Link>

        <label
          htmlFor="cart-drawer"
          className="btn btn-ghost btn-circle drawer-button"
        >
          <div className="indicator">
            {getCartCount() > 0 && (
              <span className="indicator-item badge badge-sm badge-primary">
                {getCartCount()}
              </span>
            )}

            <ShoppingCart className="h-5 w-5" />
          </div>
        </label>

        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
