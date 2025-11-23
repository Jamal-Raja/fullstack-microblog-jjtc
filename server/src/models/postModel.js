const { DataTypes } = require("sequelize");
const sequelize = require("../config/database-config");

// Define the Post model (represents the "posts" table in MySQL)
const Post = sequelize.define("Post", {
  // Title of the post
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Title is required",
      },
      len: {
        args: [5, 69],
        msg: "Please ensure title is between 5 and 69 characters long",
      },
    },
  },

  // Main content of the post
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: "content is required",
      },
      len: {
        args: [10, 10000],
        msg: "Please ensure content is between 10 and 10,000 characters long",
      },
    },
  },

  // Optional image URL associated with the post
  imageURL: {
    type: DataTypes.STRING,
    validate: {
      isUrl: {
        msg: "Please provide a valid URL for this image",
      },
    },
  },

  // Count of likes the post has recieved
  likeCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  // Count of comments on the post
  commentCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  // Foreign Key to User Model
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // Establishes relationship between Post and User models
    references: {
      model: require("./userModel"),
      key: "id",
    },
  },
});

module.exports = Post;
