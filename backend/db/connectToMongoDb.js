import mongoose from "mongoose";

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("Error connecting to mongodb");
  }
};

export default connectToMongoDb;
