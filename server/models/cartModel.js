const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product", // this productId belongs to the Product model and mongoose is allowed to fetch other data like the name, price and stuff whenever needed especially with populate()
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1, // we only send the product id when we first create the cart item and the quantity is initialised to one 
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // this userId belongs to the User model and mongoose is allowed to fetch the rest of user data like email if nedded
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Cart', cartSchema)


