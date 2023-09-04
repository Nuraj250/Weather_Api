// Import necessary modules and models at the top of the file
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create a new user
router.post('/register', async (req, res) => {
    try {
        const { email, location } = req.body;
        const user = new User({ email, location });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update user's location
router.put('/:id/location', async (req, res) => {
    try {
        const { id } = req.params;
        const { location } = req.body;
        const user = await User.findByIdAndUpdate(id, { location }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get user's weather data for a given day
router.get('/:id/weather/:date', async (req, res) => {
    try {
        const { id, date } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Implement logic to retrieve weather data for the specified date
        // You will need to fetch data from an external weather API like OpenWeatherMap
        // and store it in the user's document.
        // Then, you can filter the data for the given date and send it as a response.
        res.json(user.weatherData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
