// Loads environment variables so the database settings are available
require("dotenv").config({
  quiet: true,
});

const { Sequelize } = require("sequelize");

// Sets up the Sequelize connection using the details from the environment file
const sequelize = new Sequelize({
  dialect: "mysql",
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,

  logging: false, // Disables SQL logging
});

// Exports the configured Sequelize instance
module.exports = sequelize;
