//node scripts/server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./user'); // Adjust the path as needed

const app = express();
app.use(cors());
const port = 3006; // You can use any port

app.use(bodyParser.urlencoded({ extended: true }));

// Serve your static files (html, css, js)
app.use(express.static('.'));


const dbURI = 'mongodb+srv://joshuapoon614:UflyxoyU6AWKT1N5@cluster0.en0mz9e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// Login route
app.post('/login.html', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user in the database
        const user = await User.find({ username: username });

        if (!user) {
            return res.status(404).send('No user found.');
        }
        // Check if password matches (you should hash passwords in a real app)
        if (user.password !== password) {
            return res.status(401).send('Password does not match.');
        }

        // Login success
        res.status(200).send('Login successful!');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error on the server.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
