const { DataTypes } = require("sequelize");
const sequelize = require("../config/database-config");

// Define the Comment model (represents the "comments" table in MySQL)
const Comment = sequelize.define("Comment", {
  // The actual text content of the comment
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [1, 600],
        msg: "Please ensure comment is between 1 and 600 characters",
      },
    },
  },
  // Foreign key referencing the user who made the comment
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users",
    },
  },
  // Foreign key referencing which post the comment belongs to
  post_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "Posts",
    },
  },
});

module.exports = Comment;
