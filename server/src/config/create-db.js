const mysql = require("mysql2/promise");
/**
 * This function checks whether the database named in the environment file exists.
 * If it doesn’t, it creates it before the rest of the app tries to connect.
 */
async function ensureDatabaseExists() {
  // Pull in the database settings from the environment file
  const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

  // Connect to MySQL without choosing a database yet,
  // as the one we need may not have been created
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
  });

  // Create the database if it's missing.
  // Wrapping the name in backticks avoids issues with names with spaces
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);

  // Close the connection
  await connection.end();
}

module.exports = ensureDatabaseExists;
