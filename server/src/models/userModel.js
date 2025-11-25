const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/database-config");

// Define the User model (represents the "users" table in MySQL)
const User = sequelize.define(
  "User",
  {
    // Unique username chosen by the user
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    // Optional display name shown on the profile
    displayName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // User's email address (must be valid + unique)
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    /**
     * Raw password entered by the user.
     * This is a VIRTUAL field → NOT stored in the database.
     * We only use it temporarily for validation and hashing.
     */
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

    /**
     * Password confirmation (also VIRTUAL and not stored).
     * Used to ensure the user types the same password twice.
     */
    passwordConfirmation: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please confirm your password.",
        },
      },
    },

    /**
     * The final hashed password stored in the database.
     * This field stores only the bcrypt hash.
     */
    passwordHash: {
      type: DataTypes.STRING,
    },

    // Optional biography for the user's profile
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // Optional profile image URL
    avatarURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    /**
     * Custom validation to ensure password === passwordConfirmation.
     * Runs automatically before creating or updating the model.
     */
    validate: {
      checkPasswordsMatch() {
        if (this.password !== this.passwordConfirmation) {
          throw new Error("Passwords do not match.");
        }
      },
    },

    /**
     * By default, hide the passwordHash when returning a User object.
     * It prevents exposing sensitive data in API responses.
     */
    defaultScope: {
      attributes: { exclude: ["passwordHash"] },
    },

    /**
     * Scope for internal use (e.g., login), where we need access
     * to the stored hashed password.
     */
    scopes: {
      withPassword: {
        attributes: { include: ["passwordHash"] },
      },
    },

    hooks: {
      /**
       * Before creating a user:
       * - Hash the raw password
       * - Store it in passwordHash
       */
      async beforeCreate(user) {
        if (user.password) {
          user.passwordHash = await bcrypt.hash(user.password, 12);
        }
      },

      /**
       * Before updating a user:
       * - Only hash the password if it was changed
       */
      async beforeUpdate(user) {
        if (user.changed("password")) {
          user.passwordHash = await bcrypt.hash(user.password, 12);
        }
      },
    },
  }
);

module.exports = User;
