import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: String,
    Image: String,
    content: String,
    Date: Date
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
