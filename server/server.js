const sequelize = require("./src/config/database-config");

const express = require("express");
const app = express();

const runServer = async () => {
  try {
    console.log("Attempting to connect to MySQL DB...");

    await sequelize.authenticate();
    console.log(
      "\x1b[36m%s\x1b[0m",
      "MySQL connection established successfully."
    );

    await sequelize.sync();
    console.log("Models synced with DB.");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(
        "\x1b[1m\x1b[33m%s\x1b[0m",
        `Server Running on --> http://localhost:${PORT}`
      );
    });
  } catch (err) {
    // HANDLE DB CONNECTION ERRORS
    console.error("DB connection error -> ", err.message);
    process.exit(1);
  }
};
console.log("JAMAL ADDED THIS");
runServer();
