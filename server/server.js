const ensureDatabaseExists = require("./src/config/create-db");
const sequelize = require("./src/config/database-config");

const express = require("express");
const app = express();

// Import models to sync with database
require("./src/models/userModel");
require("./src/models/postModel");

const runServer = async () => {
  try {
    console.log("Attempting to connect to MySQL DB...");

    // Ensures the database exists before Sequelize tries to connect
    await ensureDatabaseExists();

    // Tests the connection to the database
    await sequelize.authenticate();
    console.log(
      "\x1b[36m%s\x1b[0m",
      "MySQL connection established successfully."
    );

    // Syncs all defined models with the database
    await sequelize.sync({ force: true });
    console.log("Models synced with DB.");

    // Starts the Express server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(
        "\x1b[1m\x1b[33m%s\x1b[0m",
        `Server Running on --> http://localhost:${PORT}`
      );
    });
  } catch (err) {
    // Handles database-related errors during start-up
    console.error("DB connection error -> ", err.message);
    process.exit(1);
  }
};

runServer();
