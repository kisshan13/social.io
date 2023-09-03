import { config } from "dotenv";
import mongoose from "mongoose";

config();

const DATABASE_CONNECTION_URI = process.env.DATABASE_CONNECTION_URI;

if (!DATABASE_CONNECTION_URI) {
  throw new Error("No Database connection uri found.");
}

const database = mongoose.createConnection(DATABASE_CONNECTION_URI);

export default database;
