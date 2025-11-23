const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/database-config");

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    displayName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        len: {
          args: [8],
          msg: "Password must be at least 8 characters long.",
        },
      },
    },

    passwordConfirmation: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please confirm your password.",
        },
      },
    },

    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    avatarURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    validate: {
      checkPasswordsMatch() {
        if (this.password !== this.passwordConfirmation) {
          throw new Error("Passwords do not match.");
        }
      },
    },

    defaultScope: {
      attributes: { exclude: ["passwordHash"] },
    },

    scopes: {
      withPassword: {
        attributes: { include: ["passwordHash"] },
      },
    },

    hooks: {
      async beforeCreate(user) {
        if (user.password) {
          user.passwordHash = await bcrypt.hash(user.password, 12);
        }
      },

      async beforeUpdate(user) {
        if (user.changed("password")) {
          user.passwordHash = await bcrypt.hash(user.password, 12);
        }
      },
    },
  }
);

module.exports = User;
