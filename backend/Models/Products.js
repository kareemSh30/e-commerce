import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },

    image: {
      type: String,
      required: true,
      default: ""
    },

    images:String,

    countInStock: {
      type: Number,
      required: true,
      default: 0,
    }
  },
  {
    timestamps: true, 
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
