const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
    try {
      const users = await User.find().select("-password"); // fetch all users without their passwords
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
}



// create token function

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token

    const token = createToken(user._id);

    res.status(200).json({
      email: user.email,
      token,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(400).json({ error: error.message }); // this gives us an error response those we wrote in the model or additional errors that may happen along the way
  }
};

// signup  user

const signupUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const user = await User.signup(first_name, last_name, email, password);

    const token = createToken(user._id);

    res.status(200).json({
      email: user.email,
      token,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser, getUsers };
