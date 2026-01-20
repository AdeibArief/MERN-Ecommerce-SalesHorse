import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';
import toast from 'react-hot-toast';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getOrderById(id, user.token);
      setOrder(response.data);
    } catch (err) {
      toast.error('Failed to load order');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    try {
      setCancelling(true);
      const response = await orderAPI.cancelOrder(id, user.token);
      
      if (response.success) {
        toast.success('Order cancelled successfully');
        setOrder(response.data);
      }
    } catch (err) {
      toast.error('Failed to cancel order',err.message);
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
          <button onClick={() => navigate('/orders')} className="btn btn-primary">
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const canCancel = order.orderStatus === 'Pending' || order.orderStatus === 'Processing';

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <button onClick={() => navigate('/orders')} className="btn btn-ghost mb-4">
          ← Back to Orders
        </button>

        {/* Order Header */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  Order #{order._id.slice(-8).toUpperCase()}
                </h1>
                <p className="text-base-content/60">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className={`badge badge-lg ${
                order.orderStatus === 'Delivered' ? 'badge-success' :
                order.orderStatus === 'Shipped' ? 'badge-info' :
                order.orderStatus === 'Cancelled' ? 'badge-error' :
                'badge-warning'
              }`}>
                {order.orderStatus}
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h2 className="card-title mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex gap-4 p-4 bg-base-200 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm text-base-content/60">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${item.price}</p>
                    <p className="text-sm text-base-content/60">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h2 className="card-title mb-4">Shipping Address</h2>
            <p>
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
              {order.shippingAddress.address}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
              {order.shippingAddress.country}
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h2 className="card-title mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Items:</span>
                <span>${order.itemsPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${order.taxPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{order.shippingPrice === 0 ? 'FREE' : `$${order.shippingPrice}`}</span>
              </div>
              <div className="divider"></div>
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-primary">${order.totalPrice}</span>
              </div>
            </div>
            
            {canCancel && (
              <button
                onClick={handleCancelOrder}
                disabled={cancelling}
                className="btn btn-error btn-outline btn-block mt-6"
              >
                {cancelling ? 'Cancelling...' : 'Cancel Order'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;