import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart, getCartCount } = useCart();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    zipcode: "",
    country: "India",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulation of order processing

    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    window.alert("Order has been placed mate");
    clearCart();
    setIsProcessing(false);
    navigate("/");
  };

  // Redirect if cart is empty

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Checkout</h2>
          <p className="mb-6"> Add some products before checking out </p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Shipping Information</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text mb-2">First Name*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      className="input input-bordered"
                      required
                      onChange={handleChange}
                    />
                  </div>{" "}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text mb-2">Last Name*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      onChange={handleChange}
                      value={formData.lastName}
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text mb-2">Email*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text mb-2">Phone*</span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      onChange={handleChange}
                      value={formData.phone}
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text mb-2">Address</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      onChange={handleChange}
                      value={formData.address}
                      className="input input-bordered "
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text mb-2">City</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      onChange={handleChange}
                      value={formData.city}
                      className="input input-bordered"
                      required
                    />
                  </div>{" "}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text mb-2">State*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      onChange={handleChange}
                      value={formData.state}
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text mb-2">Zip Code*</span>
                    </label>
                    <input
                      type="text"
                      name="zipcode"
                      onChange={handleChange}
                      value={formData.zipcode}
                      className="input input-bordered"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-lg mt-6"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="loading loading-spinner">
                      Processing...
                    </span>
                  ) : (
                    "Place order"
                  )}
                </button>
              </form>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 max-h-96 overflow-auto mb-4">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-4 p-3 bg-base-200 rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-sm text-base-content/60">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="divider"></div>

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal ({getCartCount()} items):</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="text-success">FREE</span>
                </div>
                <div className="flex justify-between text-sm text-base-content/60">
                  <span>Tax (estimated):</span>
                  <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>

                <div className="divider"></div>

                <div className="flex justify-between text-2xl font-bold">
                  <span>Total:</span>
                  <span className="text-primary">
                    ${(getCartTotal() * 1.08).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
