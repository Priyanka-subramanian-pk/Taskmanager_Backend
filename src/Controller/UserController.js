const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  userRegister: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    //------------------ Validate password (check if it's a string and meets the strength requirement)
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
        status: "failure",
        error: true,
      });
    }
    // ---------------Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists.",
        status: "failure",
        error: true,
      });
    }
    //------------- Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // --------------Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // --------Save the user to the database
    await newUser.save();

    return res
      .status(201)
      .json({
        message: "User registered successfully!",
        status: "success",
        error: false,
        newUser,
      });
  },


  // ========================Logi==================
  userLogin: async (req, res) => {
    const { email, password } = req.body;
    // --------Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        status: "failure",
        error: true,
      });
    }
    // ----------Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid password.",
        status: "failure",
        error: true,
      });
    }

    const secret = process.env.SECRET_KEY;
    const token = jwt.sign(
      {
        userId: user._id,
      },
      secret,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Login successful!",
      status: "success",
      error: false,
      token,
    });
  }


};
