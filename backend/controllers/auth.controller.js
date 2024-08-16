import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(404).json({ error: "Invalid username or password!" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profielPic: user.profilePic,
    });
  } catch (error) {
    console.log("Error occured in login controller", error.message);
    res
      .status(500)
      .json({ error: error.message || "Internal server error occurred!" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: error.message || "Internal server Error" });
  }
};

export const signup = async (req, res) => {
  try {
    console.log(req.body);

    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    //    https://avatar-placeholder.iran.liara.run/
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const profilePic = `https://avatar.iran.liara.run/username?username=${fullName}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      profilePic: profilePic,
      gender,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
        gender: newUser.gender,
      });
    } else {
      res.status(400).json({ error: "Invalid User data" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An internal error occured" });
  }
};
