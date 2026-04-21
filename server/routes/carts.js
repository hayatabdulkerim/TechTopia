const express = require("express");
const router = express.Router();

const {
  createCartItem,
  getCartItems,
  deleteCartItem,
  updateCartItem,
} = require("../controllers/cartController");

// this makes sure that the user is authenticated before they be able to access any of the routes down below
const requireAuth = require('../middleware/requireAuth') //***
router.use(requireAuth); // this runs before any of the routes below and makes sure the user is logged in before being able to acess any of the routes below

// routes

router.get("/", getCartItems);
router.post("/", createCartItem);
router.delete("/:id", deleteCartItem);
router.patch("/:id", updateCartItem);

module.exports = router;

// is not connected to user with require auth yet