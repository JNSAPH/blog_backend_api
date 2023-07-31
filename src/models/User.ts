import mongoose from "mongoose";
import crypto from "crypto";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);

export default User;
