


const User = require("../Model/userModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

module.exports = {
  userRegister: async (req, res) => {
    const { firstName, lastName, email, password, uid } = req.body;

    // Check if a uid is provided (for Google login)
    if (uid) {
      // Hash the uid before saving
      const hashedUid = await bcrypt.hash(uid, 10);

      // Check if the user with this uid already exists
      const existingUser = await User.find({ uid});
      console.log("hdghsgfh".existingUser);
      
      if (existingUser) {
        return res.status(400).json({
          message: "User with this Google UID already exists.",
          status: "failure",
          error: true,
        });
      }

      // Create a new user with the hashed uid
      const newUser = new User({
        uid: hashedUid,
        // email: email || `placeholder_${uid}@example.com`, // Use a placeholder if email is null

       
      });

      // Save the user to the database
      await newUser.save();

      return res.status(201).json({
        message: "User registered successfully with Google UID!",
        status: "success",
        error: false,
        newUser,
      });
    } else {
      // Validate the password 
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

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "User with this email already exists.",
          status: "failure",
          error: true,
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user with the email, password, and other details
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      // Save the user to the database
      await newUser.save();

      return res.status(201).json({
        message: "User registered successfully!",
        status: "success",
        error: false,
        newUser,
      });
    }
  },

  // User login function
  userLogin: async (req, res) => {
    const { email, password, uid } = req.body;

    if (uid) {
      // Check if the user with this uid exists
      // const hashedUid = await bcrypt.hash(uid, 10);
      const user = await User.find({ uid });
      console.log("user.......",user);
      
      if (!user) {
        return res.status(400).json({
          message: "User not found with this Google UID.",
          status: "failure",
          error: true,
        });
      }

      // Generate a token for the user
      const secret = process.env.SECRET_KEY;
      const token = jwt.sign(
        {
          userId: user._id,
        },
        secret,
        { expiresIn: "24h" }
      );

      return res.status(200).json({
        message: "Login successful with Google UID!",
        status: "success",
        error: false,
        token,
      });

    } else {
      // Check if the user exists by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "User not found.",
          status: "failure",
          error: true,
        });
      }

      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({
          message: "Invalid password.",
          status: "failure",
          error: true,
        });
      }

      // Generate a token for the user
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
  },
};

