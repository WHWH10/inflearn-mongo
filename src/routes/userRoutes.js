const { Router } = require("express");
const mongoose = require("mongoose");
const userRouter = Router();
const User = require("../models/Users");

userRouter.get("/", async (req, res) => {
  try {
    const user = await User.find({});
    return res.send({ user });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

userRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId))
      return res.status(400).send({ err: "invalid userid" });
    const user = await User.findOne({ _id: userId });
    return res.send({ user });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

userRouter.post("/", async (req, res) => {
  try {
    let { username, name } = req.body;
    // if (!username)
    //   return res.send(400).send({ err: "username is required" });
    // if (!name || !name.first || !name.last)
    //   return res
    //     .status(400)
    //     .send({ err: "Both first and last name is required" });
    const user = new User(req.body);
    await user.save();
    return res.send({ success: user });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err.message });
  }
});

userRouter.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId))
      return res.status(400).send({ err: "invalid userid" });
    const user = await User.findOneAndDelete({ _id: userId });
    return res.send({ user });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

userRouter.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId))
      return res.status(400).send({ err: "invalid userid" });
    const { age, name } = req.body;
    // const user = await User.findByIdAndUpdate(
    //   userId,
    //   { $set: { age } },
    //   { new: true }
    // );
    let user = await User.findById(userId);
    if (age) user.age = age;
    if (name) user.name = name;
    await user.save();
    return res.send({ user });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = { userRouter };
