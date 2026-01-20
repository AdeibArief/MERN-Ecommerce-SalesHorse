import axios from "axios";

// Auto-detect environment
const isDevelopment = window.location.hostname === "localhost";
const API_URL = isDevelopment
  ? "http://localhost:5001"
  : import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("🔗 Connecting to:", API_URL);

export const productAPI = {
  getAllProducts: async () => {
    try {
      const response = await api.get("/products");
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`); // FIXED
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  getProductsByCategory: async (category) => {
    try {
      const response = await api.get(`/products/category/${category}`); // FIXED
      return response.data;
    } catch (error) {
      console.error("Error fetching products by category:", error);
      throw error;
    }
  },

  createProduct: async (productData) => {
    try {
      const response = await api.post("/products", productData);
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },
};

export const orderAPI = {
  createOrder: async (orderData, token) => {
    try {
      const response = await api.post(`${API_URL}/api/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating order", error);
      throw error;
    }
  },

  getMyOrders: async (token) => {
    try {
      const response = await api.get(`${API_URL}/api/orders/myorders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching orders", error);
      throw error;
    }
  },

  getOrderById: async (id, token) => {
    try {
      const response = await api.get(`${API_URL}/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching", error);
      throw error;
    }
  },

  cancelOrder:async (id,token) => {
    try {
      const response=await api.put(`${API_URL}/api/orders/${id}/cancel`,{},{headers:{Authorization:`Bearer ${token}`}});
      
      return response.data
    } catch (error) {
      console.error("Error fetching", error);
      throw error;
    }

  }
};

export default api;
