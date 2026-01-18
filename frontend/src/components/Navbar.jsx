import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, ShoppingCart, User } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { getCartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

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

        <a to="#products" className="btn btn-ghost">
          Products
        </a>

        {/* Cart Button */}
        <label
          htmlFor="cart-drawer"
          className="btn btn-ghost btn-circle drawer-button"
          aria-label="open shopping cart"
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

        {isAuthenticated ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user?.avatar} alt={user?.name} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-1 p-2 shadow bg-base-200 rounded-box w-52"
            >
              <li className="menu-title">
                <span>{user?.name}</span>
              </li>

              <li>
                <Link to="/profile">
                  <User className="w-5 h-5" />
                  My Profile
                </Link>
              </li>

              <li>
                <Link to="/orders">
                  <ShoppingCart className="w-5 h-5" />
                  My orders
                </Link>
              </li>

              {user?.role === "admin" && (
                <li>
                  <Link to="/admin">
                    <User className="w-5 h-5" />
                    Admin DashBoard
                  </Link>
                </li>
              )}

              <div className="divider my-0"></div>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-error font-bold text-primary"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost hidden md:flex">
              Login
            </Link>

            <Link to="/register" className="btn btn-primary hidden md:flex ">
              Register
            </Link>
          </>
        )}

        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
