const express = require("express");
const mongoose = require("mongoose");
// const User = require("./models/Users");
const { userRouter, blogRouter, commentRouter } = require("./routes");
const { generateFakeData } = require("../faker");
// const { blogRouter } = require("./routes/blogRoutes");
// const { commentRouter } = require("./routes/commentRoutes");

const app = express();

const MONGO_URI = "";

const server = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // mongoose.set("debug", true);
    await generateFakeData(100, 10, 20);
    console.log(`MongoDB Connected`);
    app.use(express.json());

    app.use("/user", userRouter);
    app.use("/blog", blogRouter);
    app.use("/blog/:blogId/comment", commentRouter);

    app.listen(3000, () => {
      console.log(`Server Start`);
    });
  } catch (err) {
    console.log(err);
  }
};

server();
