const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  major: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  currentCourses: [{
    type: String,
    required: true
  }]
}, { timestamps: true }); // Optional: adds createdAt and updatedAt timestamps

// Compile and export our model using the above-defined schema
const User = mongoose.model('User', userSchema);

module.exports = User;
