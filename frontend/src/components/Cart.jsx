import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, X } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();

  const {
    cart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    document.getElementById("cart-drawer").checked = false;

    navigate("/checkout");
  };

  const handleIncreaseQuantity = (productId, currentQuantity) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    } else {
      removeFromCart(productId);
    }
  };

  const handleRemove = (productId) => {
    if (window.confirm("Are you sure ?")) removeFromCart(productId);
  };

  const handleClearCart = () => {
    if (window.confirm("Clear entire cart")) {
      clearCart();
    }
  };

  return (
    <div className="menu p-4 w-80 md:w-96 min-h-full bg-base-100 text-base-content">
      {/* CARD HEADER */}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Shopping Cart</h2>
        <X className="size-5" />
      </div>

      {/* Empty cart state */}

      {cart.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-full py-12">
          <ShoppingCart size={25} />
          <p className="text-lg text-base-content/50 mb-4">
            Your cart is empty
          </p>
          <label htmlFor="cart-drawer" className="btn btn-primary">
            Continue Shopping
          </label>
        </div>
      ) : (
        <>
          {/* CART ITEM LIST */}

          <div className="flex-1 overflow-auto mb-4 space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="card-body p-3">
                  <div className="flex gap-3">
                    {/* Product image */}
                    <div className="avatar">
                      <div className="size-20 rounded">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    {/* Product details */}
                    <div className="flex-1">
                      <h4 className="font-bold text-sm line-clamp-2">
                        {item.name}
                      </h4>
                      <p className="text-sm text-primary font-semibold">
                        ${item.price.toFixed(2)}
                      </p>
                      {/* Quality controls */}

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            handleDecreaseQuantity(item._id, item.quantity)
                          }
                          aria-label="Decrease quantity"
                          className="btn btn-xs btn-circle btn-outline"
                        >
                          -
                        </button>
                        <span className="font-bold text-sm px-2">
                          {item.quantity}
                        </span>

                        <button
                          disabled={item.quantity >= item.stock}
                          onClick={() =>
                            handleIncreaseQuantity(item._id, item.quantity)
                          }
                          className="btn btn-xs btn-circle btn-outline"
                        >
                          +
                        </button>

                        <button
                          onClick={handleRemove}
                          className="btn btn-xs btn-error btn-outline ml-auto"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-xs text-base-content/50 mt-1">
                        Subtotal:${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Cart summary */}
          <div className="border-t pt-4 space-y-4">
            <span>Items:</span>
            <span className="font-semibold">{getCartCount()}</span>
          </div>

          {/* Shipping */}
          <div className="flex justify-center text-sm">
            <span>Shipping:</span>
            <span className="text-success font-bold">FREE</span>
          </div>

          <div className="divider my-2"></div>

          {/* Total */}
          <div className="text-xl flex justify-between font-bold">
            <span>Total:</span>
            <span className="text-primary">${getCartTotal().toFixed(2)}</span>
          </div>

          {/* Checkout button */}

          <button
            onClick={handleCheckout}
            className="btn btn-success btn-block btn-lg"
          >
            Proceed to checkout
          </button>

          <button
            onClick={handleClearCart}
            className="btn btn-error btn-outline btn-lg"
          >
            Clear Cart
          </button>

          <label className="btn btn-ghost btn-block" htmlFor="cart-drawer">
            Continue Shopping
          </label>
        </>
      )}
    </div>
  );
};

export default Cart;
