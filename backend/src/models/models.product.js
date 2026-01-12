import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add product name"],
      trim: true,
      maxlength: [100, "Name cannot extend more than 100 characters"],
    },
    description: {
      type: String,
      required: true,
      maxlength: [500, "Please keep the description upto 500 characters"],
    },
    price: {
      type: Number,
      required: [true, "please enter a valid price"],
      min: [0, "Price cannot be negative"],
      default: 0,
    },
    image: {
      type: String,
      required: [true, "please enter image url"],
    },
    category: {
      type: String,
      required: [true, "Please add category"],
      enum: {
        values: [
          "electronics",
          "clothing",
          "books",
          "home",
          "sports",
          "accessories",
        ],
        message: "Please select a valid category",
      },
    },
    stock: {
      type: Number,
      required: [true, "Please add a stock quantity"],
      min: [0, "cannot be less than 0"],
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: [0, "minimum is 0"],
      max: [5, "maximum is 5 "],
    },

    numReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product