// IMPORTS & INITIALIZATIONS
require("./src/models/index");
const ensureDatabaseExists = require("./src/config/create-db");
const globalErrorHandler = require("./src/middleware/globalErrorHandler");
const sequalizeErrorHandler = require("./src/middleware/sequalizeErrorHandler");
const sequelize = require("./src/config/database-config");

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

// EXPRESS INITIALISATION
const app = express();
const server = createServer(app);

// SOCKET.IO INITIALISATION
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


// ROUTES
const userRoutes = require("./src/routes/userRoutes");
const postRoutes = require("./src/routes/postRoutes");
const commentRoutes = require("./src/routes/commentRoutes");
const messageRoutes = require("./src/routes/messageRoutes");

// MIDDLEWARE
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/messages", messageRoutes);

app.use(sequalizeErrorHandler);
app.use(globalErrorHandler);

// START SERVER & CONNECT TO DB
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
    await sequelize.sync();
    console.log("Models synced with DB.");

    // Starts the Express server
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
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
