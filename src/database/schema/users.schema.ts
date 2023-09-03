import mongoose, { Schema, get } from "mongoose";
import database from "../database";
import { boolean } from "zod";

const userSchema = new Schema(
  {
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
    requests: {
      type: [mongoose.Types.ObjectId],
      ref: "Requests",
    },
    profileType: {
      type: String,
      default: "Public",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },         
  }
); 

userSchema.virtual("followersCount").get(function () {
  return this.followers.length;
});

userSchema.virtual("followingCount").get(function () {
  return this.following.length;
});

userSchema.virtual("postsCount").get(function () {
  return this.posts.length;
});

const User = database.model("User", userSchema);

export default User;
