import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./.env" });

const url: string =
  process.env.MONGO_URI !== undefined ? process.env.MONGO_URI : "";

const connectDB = async () => {
  await mongoose.connect(url);
  console.log("MongoDb Connected");
};

export = { connectDB };

// import { MongoClient } from "mongodb";
// // Replace the uri string with your MongoDB deployment's connection string.
// const uri: string =
//   process.env.MONGO_URI !== undefined ? process.env.MONGO_URI : "";
// const client = new MongoClient(uri);
// async function run() {
//   try {
//     await client.connect();
//     // database and collection code goes here
//     // find code goes here
//     // iterate code goes here
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
