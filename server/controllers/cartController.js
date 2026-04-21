const mongoose = require("mongoose");
const Cart = require("../models/cartModel");

// get all cart items

const getCartItems = async (req, res) => {
  try {
    const userId = req.user._id; // the id of the currently logged in user is sent with the request , here we are extracting it and storing it in userId

    const cartItems = await Cart.find({ userId })
      .populate("productId") // this replaces the productId field (which is just an ID) with the actual product document from the database.
      .sort({ createdAt: -1 });

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create a cart item (add to cart)

const createCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    const existingItem = await Cart.findOne({ userId, productId });

    if (existingItem) {
      existingItem.quantity += quantity || 1; // add the quantity that the user requested or just add one
      await existingItem.save(); // replace this with find and update by id later ###

      await existingItem.populate("productId"); // we populated it so that we can build the cart item ui again with the name , price and the updated quantity

      return res.status(200).json(existingItem);
    }

    const newItem = await Cart.create({
      productId,
      quantity: quantity || 1,
      userId,
    });

    await newItem.populate("productId");

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// delete a cart item from the cart

const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Cart.findById(id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    //  make sure user owns this item
    if (item.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await Cart.findByIdAndDelete(id);

    res.status(200).json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// decrease the quantity of cart item

const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Cart.findById(id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    if (item.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    // decrement
    item.quantity -= 1;

    if (item.quantity <= 0) {
      await Cart.findByIdAndDelete(id);
      return res.status(200).json({ message: "Item removed" });
    }

    await item.save();

    //  return populated item
    const updatedItem = await Cart.findById(id).populate("productId");

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createCartItem,
  getCartItems,
  deleteCartItem,
  updateCartItem,
};


// when we do getCartItems this is what we get
// {
//   "_id": "cart123",
//   "userId": "user456",
//   "productId": "prod789",
//   "quantity": 2,
//   "createdAt": "2026-04-21T10:00:00Z"
// }


// and this is it afrer we do populate

//  {
//     "_id": "cart123",
//     "userId": "user456",
//     "productId": {
//       "_id": "prod789",
//       "name": "AirPods Pro",
//       "price": 250,
//       "imageLink": "https://...",
//       "description": "Noise cancelling earbuds"
//     },
//     "quantity": 2,
//     "createdAt": "2026-04-21T10:00:00Z"
//   },