const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    location: String,
    weatherData: [
        {
            date: Date,
            temperature: Number,
            // Add other weather data fields here
        },
    ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
