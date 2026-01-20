import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';
import { Package, Calendar, DollarSign } from 'lucide-react';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getMyOrders(user.token);
      setOrders(response.data);
    } catch (err) {
      setError('Failed to load orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'badge-success';
      case 'Shipped':
        return 'badge-info';
      case 'Processing':
        return 'badge-warning';
      case 'Cancelled':
        return 'badge-error';
      default:
        return 'badge-ghost';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error max-w-md">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center py-12">
              <Package className="w-24 h-24 mx-auto text-base-content/20 mb-4" />
              <h2 className="text-2xl font-bold mb-2">No Orders Yet</h2>
              <p className="text-base-content/60 mb-6">
                You haven't placed any orders. Start shopping now!
              </p>
              <Link to="/" className="btn btn-primary">
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </h3>
                        <div className={`badge ${getStatusBadgeClass(order.orderStatus)}`}>
                          {order.orderStatus}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-base-content/60">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          {order.orderItems.length} items
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          ${order.totalPrice}
                        </div>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="flex -space-x-2">
                      {order.orderItems.slice(0, 3).map((item, index) => (
                        <div key={index} className="avatar">
                          <div className="w-12 h-12 rounded-full ring ring-base-100">
                            <img src={item.image} alt={item.name} />
                          </div>
                        </div>
                      ))}
                      {order.orderItems.length > 3 && (
                        <div className="avatar placeholder">
                          <div className="w-12 h-12 rounded-full ring ring-base-100 bg-neutral text-neutral-content">
                            <span>+{order.orderItems.length - 3}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        to={`/order/${order._id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;