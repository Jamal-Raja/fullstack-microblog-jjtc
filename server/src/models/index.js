const User = require("../models/userModel");
const Post = require("../models/postModel");

// A user can create many posts (one-to-many relationship)
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE", // If a user is deleted, all their posts are also removed
});

// Each post belongs to a single user (defines the inverse relationship)
Post.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Post };
