const { Router } = require("express");
const { isValidObjectId } = require("mongoose");
const blogRouter = Router();
const User = require("../models/Users");
const Blog = require("../models/Blog");
// const { User, Blog } = require("../models");

// blogRouter.use("/:blogId/comment", commentRouter);

blogRouter.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    return res.send({ blogs });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

blogRouter.get("/:blogId", async (req, res) => {
  try {
    const { blogId } = req.params;
    if (!isValidObjectId(blogId))
      return res.status(400).send({ error: "invalid blogId" });
    const blog = await Blog.findById(blogId);
    return res.send({ blog });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

blogRouter.post("/", async (req, res) => {
  try {
    const { title, content, islive, userId } = req.body;
    if (!isValidObjectId(userId))
      return res.status(400).send({ error: "invalid userId" });

    let user = await User.findById(userId);
    if (!user) res.status(400).send({ error: "User does not Exists" });

    let blog = new Blog({ ...req.body, user });
    await blog.save();
    return res.send(blog);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err.message });
  }
});

blogRouter.put("/:blogId", async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, content } = req.body;
    if (typeof title !== "string")
      return res.status(400).send({ error: "title is required" });
    if (typeof content !== "string")
      return res.status(400).send({ error: "content is required" });

    const blog = await Blog.findOneAndUpdate(
      blogId,
      {
        title,
        content,
      },
      { new: true }
    );
    return res.send({ blog });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

// 부분 수정할 때 사용함
blogRouter.patch("/:blogId/live", async (req, res) => {
  try {
    const { blogId } = req.params;
    if (!isValidObjectId(blogId))
      return res.status(400).send({ error: "invalid blogId" });

    const { islive } = req.body;
    if (typeof islive !== "boolean")
      return res.status(400).send({ error: "islive must be boolean" });

    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { islive },
      { new: true }
    );

    return res.send({ blog });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = { blogRouter };
