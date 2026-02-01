// ==========================================
// FILE: frontend/src/components/Cart.jsx
// ==========================================
// FIXED: Checkout redirect bug

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount, clearCart } = useCart();
  const { user } = useAuth(); // ✅ Use "user" directly, NOT isAuthenticated

  const handleCheckout = () => {
    // Close drawer first
    document.getElementById('cart-drawer').checked = false;

    // ✅ FIXED: Check "user" directly instead of "isAuthenticated"
    // isAuthenticated might not update immediately after login
    if (!user) {
      toast.error('Please login to checkout');
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }

    // User is logged in, go to checkout
    navigate('/checkout');
  };

  return (
    <div className="menu p-4 w-80 md:w-96 min-h-full bg-base-100 text-base-content">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">Shopping Cart</h3>
        <label htmlFor="cart-drawer" className="btn btn-sm btn-circle btn-ghost">
          ✕
        </label>
      </div>

      {/* Empty Cart */}
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 text-base-content/20 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <p className="text-lg text-base-content/50 mb-4">Your cart is empty</p>
          <label htmlFor="cart-drawer" className="btn btn-primary">
            Continue Shopping
          </label>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="flex-1 overflow-auto mb-4 space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="card bg-base-200 shadow-sm">
                <div className="card-body p-3">
                  <div className="flex gap-3">
                    <div className="avatar">
                      <div className="w-20 h-20 rounded">
                        <img src={item.image} alt={item.name} className="object-cover" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-sm text-primary font-semibold">${item.price.toFixed(2)}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="btn btn-xs btn-circle btn-outline"
                        >-</button>
                        <span className="font-bold text-sm px-2">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="btn btn-xs btn-circle btn-outline"
                        >+</button>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="btn btn-xs btn-error btn-outline ml-auto"
                        >Remove</button>
                      </div>

                      <p className="text-xs text-base-content/50 mt-1">
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="border-t pt-4 space-y-4">
            <div className="flex justify-between text-sm">
              <span>Items:</span>
              <span className="font-semibold">{getCartCount()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping:</span>
              <span className="text-success font-semibold">FREE</span>
            </div>

            <div className="divider my-2"></div>

            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span className="text-primary">${getCartTotal().toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="btn btn-success btn-block btn-lg"
            >
              Proceed to Checkout
            </button>

            {/* Clear Cart */}
            <button
              onClick={() => clearCart()}
              className="btn btn-outline btn-error btn-block btn-sm"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;