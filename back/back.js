// Import necessary modules
const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');
// Initialize Express app
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/Skinify', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Create a Mongoose schema for user
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create a Mongoose model for user
const User = mongoose.model('User', UserSchema);

// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Register route
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    user = new User({
      email,
      password: hashedPassword
    });

    // Save the user to the database
    await user.save();

    res.status(200).json({ message: 'User registered successfully' });
  } catch (err) {
    console.log(password,email);
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    // Find user by email
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials',
    email:user.email });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If passwords match, return success message
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Route for uploading photo (protected route, requires authentication)
app.post('/upload-photo', upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Convert the uploaded photo to base64
    const base64Image = req.file.buffer.toString('base64');

    // Make a request to your model endpoint
    const modelResponse = await axios.post('http://0.0.0.0:8000/predict', {
      image: base64Image
    });

    // Return the response from the model
    res.status(200).json({ "prediction":modelResponse.data.label});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
