const { Router } = require("express");
const commentRouter = Router({ mergeParams: true });
const { isValidObjectId } = require("mongoose");
const User = require("../models/Users");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

commentRouter.post("/", async (req, res) => {
  try {
    const { blogId } = req.params;
    const { content, userId } = req.body;

    if (!isValidObjectId(blogId))
      return res.status(400).send({ error: "blogId is invalid" });
    if (!isValidObjectId(userId))
      return res.status(400).send({ error: "userId is invalid" });
    if (typeof content !== "string")
      return res.status(400).send({ error: "content is required " });

    const [blog, user] = await Promise.all([
      Blog.findById(blogId),
      User.findById(userId),
    ]);
    // const blog = await Blog.findById(blogId);
    // const user = await User.findById(userId);
    if (!blog || !user)
      return res.status(400).send({ error: "blog or user does not exist" });
    if (!blog.islive)
      return res.status(400).send({ error: "blog is not available" });
    const comment = new Comment({ content, user, blog });
    await comment.save();
    return res.send({ comment });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

commentRouter.get("/", async (req, res) => {
  try {
    const { blogId } = req.params;
    if (!isValidObjectId(blogId))
      return res.status(400).send({ error: "blogId is invalid" });

    const comments = await Comment.find({ blog: blogId });
    return res.send({ comments });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = { commentRouter };
