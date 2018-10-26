const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define User Model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// Create User Class
const ModelClass = mongoose.model("user", userSchema);

// Export User
module.exports = ModelClass;
