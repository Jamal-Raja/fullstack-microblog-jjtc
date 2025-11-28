const { Post } = require("../models");
const AppError = require("../utils/appError");

// FETCH ALL POSTS
// Returns a list of all posts in the database
exports.getAllPosts = async (req, res, next) => {
  const posts = await Post.findAll();

  res.status(200).json({
    status: "success",
    results: posts.length,
    data: posts,
  });
};

// FETCH POST BY ID
// Retrieves a single post using its primary key
exports.getPostById = async (req, res, next) => {
  const postId = req.params.id;
  const post = await Post.findByPk(postId);

  if (!post) {
    return next(new AppError("Post not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: post,
  });
};

// DELETE POST BY ID
// Removes a post if it exists
exports.deletePostById = async (req, res, next) => {
  const postId = req.params.id;
  const post = await Post.findByPk(postId);

  if (!post) {
    return next(new AppError("Post not found", 404));
  }

  await post.destroy();

  res.status(200).json({
    status: "success",
    message: "Post deleted successfully.",
  });
};

// CREATE NEW POST
// Validates input and creates a new post record
exports.createPost = async (req, res, next) => {
  const { title, content, imageURL, user_id } = req.body;

  // Basic data validation
  if (!title || !content || !user_id) {
    return next(new AppError("Title, content, and user_id are required", 400));
  }

  const newPost = await Post.create({
    title,
    content,
    imageURL: imageURL ? imageURL : null,
    user_id,
  });

  res.status(201).json({
    status: "success",
    message: "Post created successfully.",
    data: newPost,
  });
};

// UPDATE POST BY ID
// Updates fields on a post if it exists and user_id is provided
exports.updatePostById = async (req, res, next) => {
  const postId = req.params.id;
  const { title, content, imageURL, user_id } = req.body;

  const post = await Post.findByPk(postId);
  if (!post) {
    return next(new AppError("Post not found", 404));
  }

  // Ensure the request includes a user_id for tracking ownership changes
  if (!user_id) {
    return next(new AppError("user_id is required to update the post", 400));
  }

  // Update only provided fields
  if (title !== undefined) post.title = title;
  if (content !== undefined) post.content = content;
  if (imageURL !== undefined) post.imageURL = imageURL;

  await post.save();

  res.status(200).json({
    status: "success",
    message: "Post updated successfully.",
    data: post,
  });
};
