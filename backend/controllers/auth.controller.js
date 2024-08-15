import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  res.send("Login user");
};

export const logout = (req, res) => {
  console.log("logout user");
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
    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
      gender: newUser.gender,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An internal error occured" });
  }
};
