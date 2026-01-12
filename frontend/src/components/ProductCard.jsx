import React from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart, isInCart, getItemQuantity } = useCart();

  const inCart = isInCart(product._id);
  const quantity = getItemQuantity(product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);

    toast.success("Added to cart successfully");
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* PRODUCT IMAGE */}
      <figure className="bg-base-200 h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      </figure>

      {/* PRODUCT DETAILS */}
      <div className="card-body p-4 flex flex-col gap-3">
        {/* Product name and category */}
        <div>
          <div className="badge badge-secondary badge-sm">
            {product.category}
          </div>
        </div>

        {/* Product name */}
        <h2 className="card-title text-base line-clamp-2">{product.name}</h2>

        {/* Product description */}
        <p className="text-sm text-base-content/70 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="rating rating-sm">
            {[...Array(5)].map((_, index) => (
              <input
                type="radio"
                key={index}
                name={`rating-${product._id}`}
                className="mask mask-star-2 bg-orange-500"
                checked={index < Math.floor(product.rating)}
                readOnly
              />
            ))}
          </div>
          <span className="text-xs">({product.rating})</span>
          {product.numReviews && (
            <span className="text-xs text-base-content/50">
              {product.numReviews} reviews
            </span>
          )}
        </div>

        {/* Stock status */}
        <div>
          {product.stock > 0 ? (
            <div className="badge badge-sm badge-success">
              {product.stock} in stock
            </div>
          ) : (
            <div className="badge badge-error badge-sm">out of stock</div>
          )}
        </div>

        {/* In cart indicator */}
        {inCart && (
          <div className="badge badge-primary badge-sm">
            In Cart: {quantity}
          </div>
        )}

        {/* Price and button */}
        <div className="card-actions justify-between items-center mt-auto">
          <div className="text-2xl font-bold text-base-content">
            ${product.price.toFixed(2)}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="btn btn-primary btn-sm"
          >
            {inCart ? "Add More" : "Add to cart"}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
