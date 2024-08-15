export const login = async (req, res) => {
  res.send("Login user");
};

export const logout = (req, res) => {
  console.log("logout user");
};

export const signup = async (req, res) => {
  try {
    const [fullName, password, confirmPassword, gender] = req.body;
  } catch (error) {}
};
