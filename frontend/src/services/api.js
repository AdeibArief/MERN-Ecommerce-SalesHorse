import axios from "axios";


// Auto-detect environment
const isDevelopment = window.location.hostname === 'localhost';
const API_URL = isDevelopment 
  ? "https://saleshorse-backend.onrender.com/" 
  : "http://localhost:5001"; // UPDATE after deploying backend

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

export default api;