const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database-config");

// Define the Message model (represents the "messages" table in MySQL)
const Message = sequelize.define("Message", {
  // Content of the message
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  // ID of the user who sent the message
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  // ID of the user who is the recipient of the message
  receiver_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  // Timestamp indicating when the message was read
  readAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = Message;
