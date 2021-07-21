const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    user: { type: ObjectId, required: true, ref: "User" }, // Collection 이름을 통해 불러옴
    blog: { type: ObjectId, required: true, ref: "Blog" },
  },
  { timestamps: true }
);

const Comment = model("Comment", CommentSchema);
module.exports = Comment;
