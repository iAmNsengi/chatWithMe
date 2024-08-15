import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import connectToMongoDb from "./db/connectToMongoDb.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Nsengi!");
});

app.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server running on port ${PORT}`);
});
