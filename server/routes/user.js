const express = require("express");
const router = express.Router();
const { signupUser, loginUser, getUsers } = require("../controllers/userController");

// get all users

router.get("/", getUsers);

// login route

router.post("/login", loginUser);

// signup route

router.post("/signup", signupUser);

module.exports = router;
