const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/products");
const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/carts");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes); // making the cart routes avaliable

const PORT = process.env.PORT;
const URI = process.env.MONGO_URI;

mongoose
  .connect(URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("connected to db and listening on port", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
