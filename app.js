const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user'); // Import your user routes
const cors = require('cors');
const app = express();
app.use('/api/users', userRoutes);


// Load environment variables
require('dotenv').config();
console.log(process.env.MONGODB_URI);

// Middleware
app.use(express.json())
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/weather?connectTimeoutMS=5000', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// Define routes and controllers (to be created later)
// app.use('/api/users', userRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
