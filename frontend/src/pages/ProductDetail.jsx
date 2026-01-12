import React, { useEffect, useState } from "react";
import { productAPI } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ArrowBigLeft, ShipIcon, ShoppingCartIcon } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart, getItemQuantity } = useCart();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await productAPI.getProductById(id);
      console.log("API Response:", response); // Debug log
      setProduct(response.message);
      console.log("✅ Product loaded:", response.message);
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Product not found");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
      setAddedToCart(true);
    }
    setTimeout(() => setAddedToCart(false), 2000);

    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      setQuantity(1);
    } else if (newQuantity > product.stock) {
      setQuantity(product.stock);
    } else {
      setQuantity(newQuantity);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-lg">Loading Product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Product not found</h2>
          <p className="mb-6">The product your looking for doesn't exist</p>
          <button onClick={() => navigate("/")} className="btn btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <button onClick={() => navigate("/")} className="btn btn-ghost mb-6">
          <ArrowBigLeft /> Back to products
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="card bg-base-200  ">
            <figure>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full shadow-xl object-fit"
              />
            </figure>
          </div>

          <div className="space-y-6">
            <div className="badge badge-secondary">{product.category}</div>
            <h1 className="text-4xl font-bold">{product.name}</h1>

            <div className="flex items-center gap-4">
              <div className="rating hover:-translate-y-1">
                {[...Array(5)].map((_, index) => (
                  <input
                    type="radio"
                    className="mask mask-star-2 bg-orange-500 "
                    key={index}
                    checked={index < Math.floor(product.rating)}
                    readOnly
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">{product.rating}</span>
              {product.numReviews && (
                <span className="text-lg text-base-content/50">
                  {product.numReviews} reviews
                </span>
              )}
            </div>
            <div className="text-4xl font-bold text-base-content">
              ${product.price.toFixed(2)}
            </div>

            <p className="text-lg leading-relaxed">{product.description}</p>
            <div className="divider"></div>

            <div className="flex items-center gap-2">
              <span className="font-bold"> Availability :</span>
              {product.stock > 0 ? (
                <div className="badge badge-success">
                  {product.stock} in stock
                </div>
              ) : (
                <div className="badge badge-error">Out of stock</div>
              )}
            </div>

            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 ">
                  <span className="font-bold">Quantity</span>
                  <div className="join">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className=" btn join-item btn-circle text-base-content border-3 border-primary-content"
                    >
                      -
                    </button>

                    <input
                      type="number"
                      onChange={(e) =>
                        handleQuantityChange(parseInt(e.target.value))
                      }
                      value={quantity}
                      className="input input-bordered join-item w-20 text-center"
                      min={1}
                      max={product.stock}
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className=" btn join-item btn-circle text-base-content border-3 border-primary-content"
                    >
                      +
                    </button>
                  </div>
                </div>

                {isInCart(product._id) && (
                  <div className="alert alert-info">
                    <ShoppingCartIcon />
                    <span className="flex">
                      You have {getItemQuantity(product._id)} of this item in
                      your cart
                    </span>
                  </div>
                )}

                <div className="space-y-3">
                  {/* Add to cart */}

                  <button
                    onClick={handleAddToCart}
                    className={`btn btn-lg btn-block ${
                      addedToCart ? "btn-success" : "btn-primary"
                    }`}
                  >
                    {addedToCart ? "Added to cart" : "Add to cart"}
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="btn btn-lg btn-outline btn-block"
                  >
                    Buy now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
