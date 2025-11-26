const { Post } = require("../models");
const AppError = require("../utils/appError");

exports.getAllPosts = async (req, res, next) => {
  const posts = await Post.findAll();

  res.status(200).json({
    status: "success",
    results: posts.length,
    data: posts,
  });
};
