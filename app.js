const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/Api'); // Import your user routes
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();


// Load environment variables
require('dotenv').config();
console.log(process.env.MONGODB_URI);

// Middleware
app.use(express.json())
app.use(cors());
app.use('/api/users', userRoutes);


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/weather?connectTimeoutMS=5000', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
