//node scripts/server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./user'); // Make sure this path is correct

const app = express();
app.use(cors());
app.use(bodyParser.json()); // To parse JSON-encoded bodies
app.use(express.static('.')); // Serve static files

const port = 3006;

// Connect to MongoDB
const dbURI = 'mongodb+srv://joshuapoon614:UflyxoyU6AWKT1N5@cluster0.en0mz9e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).send('No user found.');
        }
        if (user.password !== password) { // Note: Hash passwords in production
            return res.status(401).send('Incorrect password.');
        }
        // Send necessary data for personalization
        res.status(200).json({ username: user.username, courses: user.currentCourses });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Sign Up route
app.post('/signup', async (req, res) => {
    const { username, password, major, year, currentCourses } = req.body;

    try {
        const newUser = new User({ username, password, major, year, currentCourses });
        await newUser.save();
        // Send necessary data for personalization
        res.status(201).json({ username: newUser.username, courses: newUser.currentCourses });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating user');
    }
});




app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});









