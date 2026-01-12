import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { productAPI } from "../services/api.js";
import { TriangleAlert, Truck } from "lucide-react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "all",
    "electronics",
    "clothing",
    "sports",
    "accessories",
    "home",
    "books",
  ];

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      let response;

      if (selectedCategory === "all") {
        response = await productAPI.getAllProducts();
      } else {
        response = await productAPI.getProductsByCategory(selectedCategory);
      }

      setProducts(response.data);

      console.log(`loaded ${response.data.length} products`);
    } catch (error) {
      console.log("Error fetching products", error);
      setError(
        "Error in fetching products probably something with the backend"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="hero min-h-100 bg-linear-to-r from-primary to-secondary ">
        <div className="hero-content text-center text-primary-content">
          <div className="max-w-md">
            <h1 className="font-bold text-6xl mb-6">Welcome to SalesHorse</h1>
            <p className="text-xl mb-6">
              Discover amazing products at unbeatable prices. Shop now and enjoy
              free shipping on orders over $50!
            </p>
            <a href="#products" className="btn btn-accent btn-lg ">
              Shop Now
            </a>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-4 py-8">
        {/* Categories section */}
        <div className="flex justify-center mb-8">
          <div className="tabs tabs-boxed">
            {categories.map((category) => (
              <button
                className={`tab ${
                  selectedCategory === category ? "tab-active" : ""
                }`}
                onClick={() => handleCategoryChange(category)}
                key={category}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        {/* Section Header */}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">
            {`${
              selectedCategory === "all"
                ? "All"
                : selectedCategory.charAt(0).toUpperCase() +
                  selectedCategory.slice(1)
            } Products`}
          </h2>

          <div className="text-lg text-base-content/80">
            {!loading && products.length > 0 && (
              <span>{products.length} products found</span>
            )}
          </div>
        </div>
        {/* Loading state */}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="mt-4 text-primary">loading products...</p>
          </div>
        )}

        {/* Error State */}

        {error && !loading && (
          <div className="alert alert-error shadow-lg max-w-2xl mx-auto">
            <div>
              <TriangleAlert />
            </div>

            <div>
              <h2 className="font-bold">Error loading Products</h2>
              <div className="text-sm">{error}</div>
            </div>
            <div className="flex-none">
              <button className="btn btn-sm btn-ghost" onClick={fetchProducts}>
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}

        {!loading && !error && products.length > 0 && (
          <div id="products"  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-base-content/50 text-xl mb-4">
              No products found in this category
            </p>
            <button className="btn btn-primary" onClick={()=>handleCategoryChange('all')}>
              View all products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
