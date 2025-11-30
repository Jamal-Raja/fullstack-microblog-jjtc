const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const Message = require("../models/messageModel");

// A user can create many posts (one-to-many relationship)
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE", // If a user is deleted, all their posts are also removed
});

// Each post belongs to a single user (defines the inverse relationship)
Post.belongsTo(User, {
  foreignKey: "user_id",
});

// A user can make many comments (one-to-many relationship)
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE", // If a user is deleted, all their comments are also removed
});

// Each comment belongs to a single user
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

// A post can have many comments (one-to-many relationship)
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE", // If a post is deleted, all its comments are also removed
});

// Each comment belongs to a single post
Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

// === Message Model Associations ===
// A user can send many messages (one-to-many relationship)
Message.belongsTo(User, {
  foreignKey: "sender_id",
  as: "sender",
});

// A user can receive many messages (one-to-many relationship)
Message.belongsTo(User, {
  foreignKey: "receiver_id",
  as: "receiver",
});

module.exports = { User, Post, Comment, Message };
