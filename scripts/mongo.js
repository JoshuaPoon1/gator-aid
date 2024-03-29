const mongoose = require('mongoose');
const User = require('./user'); // Adjust the path as necessary

// Your MongoDB connection string with the password included
const dbURI = 'mongodb+srv://joshuapoon614:UflyxoyU6AWKT1N5@cluster0.en0mz9e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  /*
// Create a test user
const testUser = new User({
  username: 'testUser',
  password: 'password', // Note: In a real application, ensure passwords are hashed
  major: 'Computer Science',
  year: 2024,
  currentCourses: ['CS101', 'CS102', 'MATH123']
});

// Save the test user to the database
testUser.save()
  .then(doc => {
    console.log('Test user saved:', doc);
    mongoose.disconnect(); // Optionally disconnect after operation
  })
  .catch(err => {
    console.error('Error saving test user:', err);
  });
*/