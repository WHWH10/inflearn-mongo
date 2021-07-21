const { Schema, model, Types } = require("mongoose");

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    islive: { type: Boolean, required: true, default: false },
    user: { type: Types.ObjectId, required: true, ref: "User" }, // Collection 이름을 통해 불러옴
  },
  { timestamps: true }
);

const Blog = model("Blog", BlogSchema);
module.exports = Blog;
