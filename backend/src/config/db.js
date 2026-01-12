import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();
const mongoURI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log("connected to database");
  } catch (error) {
    console.log(error.message);
  }
};

connectDB()

export default connectDB;
