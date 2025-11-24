// === SEED FILE TO POPULATE DATABASE WITH INITIAL DATA ===
// Run this file with the command: npm run seed from the root directory
const sequelize = require("../config/database-config");

const { User, Post, Comment } = require("../models");

const userdata = require("./users.json");
const postdata = require("./posts.json");
const commentdata = require("./comments.json");

const seedDB = async () => {
  try {
    // Sync database and clear existing data
    await sequelize.sync({ force: true });
    await User.bulkCreate(userdata, { individualHooks: true });
    await Post.bulkCreate(postdata, { individualHooks: true });
    await Comment.bulkCreate(commentdata, { individualHooks: true });

    console.log(
      "\n\x1b[1m\x1b[42m\x1b[30m =====  Database seeded successfully!  ===== \x1b[0m\n"
    );

    process.exit(0); // Exit the process successfully
  } catch (error) {
    console.error(error);
    process.exit(1); // Exit the process with an error
  }
};

seedDB();
