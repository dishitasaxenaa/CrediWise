// src/config/env.js

require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  AI_PROVIDER: process.env.AI_PROVIDER || "gemini"
};
