import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./.env" });

const url: string = process.env.MONGO_URI ?? "";

const connectDB = async () => {
  await mongoose.connect(url);
  // initial()
  console.log("MongoDb Connected");
};

export = { connectDB };
