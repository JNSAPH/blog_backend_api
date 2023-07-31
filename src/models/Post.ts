import mongoose from "mongoose";
import crypto from "crypto";

const PostSchema = new mongoose.Schema({
    id: { type: String, default: () => crypto.randomUUID() },
    title: { type: String, required: true },
    image: { type: String, default: "https://source.unsplash.com/random"},
    content: { type: String, required: true },
    author: { type: String, default: "Admin" },
    date: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
