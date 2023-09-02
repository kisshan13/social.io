import mongoose, { Schema } from "mongoose";
import database from "../database";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  followers: {
    type: [mongoose.Types.ObjectId],
    ref: "User",
  },
  following: {
    type: [mongoose.Types.ObjectId],
    ref: "User",
  },
  posts: {
    type: [mongoose.Types.ObjectId],
    ref: "Posts",
  },
  
});
