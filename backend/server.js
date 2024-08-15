import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello from Nsengi!");
});
app.get("/api/auth/signup", (req, res) => {
  console.log("Signup route");
});

app.get("/api/auth/login", (req, res) => {
  console.log("login route");
});

app.get("/api/auth/logout", (req, res) => {
  console.log("login route");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
