const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // to remove extra spaces
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0, // preventing negative prices
    },
    imageLink: {
      type: String,
      required: true,
      //  match: [/^https?:\/\/.+/, "Please use a valid URL"], //This is Mongoose validation using a Regular Expression (Regex).
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);

// handle favorites
