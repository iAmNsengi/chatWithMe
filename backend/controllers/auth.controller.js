import User from "../models/user.model";

export const login = async (req, res) => {
  res.send("Login user");
};

export const logout = (req, res) => {
  console.log("logout user");
};

export const signup = async (req, res) => {
  try {
    const { fullName, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    //    https://avatar-placeholder.iran.liara.run/
    const user = await User.findOne({ username });
    https: if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }
  } catch (error) {}
};
