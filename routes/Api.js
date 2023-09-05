// Import necessary modules and models at the top of the file
const express = require('express');
const router = express.Router();
const Api = require('../models/user');

// Create a new user
router.post('/register',  async (req, res) => {
    console.log("body :",req.body )
    try {
        if (!req.body || !req.body.email || !req.body.location) {
            return res.status(400).json({ error: 'Invalid request body' });
        }
        const { email, location } = req.body;
        const user = new Api({ email, location });
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
        const user = await Api.findByIdAndUpdate(id, { location }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'Api not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get user's weather data for a given day (optional date parameter)
router.get('/:id/weather/:date?', async (req, res) => {
    try {
        const { id, date } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Determine the date to use (current date if not provided)
        let requestedDate;
        if (date) {
            // Parse the provided date string to a Date object
            requestedDate = new Date(date);

            // Ensure the provided date is valid
            if (isNaN(requestedDate.getTime())) {
                return res.status(400).json({ error: 'Invalid date format' });
            }
        } else {
            // Use the current date if no date parameter is provided
            requestedDate = new Date();
        }

        // Find weather data for the specified date
        const weatherData = user.weatherData.filter((data) => {
            const dataDate = new Date(data.date);
            return (
                dataDate.getFullYear() === requestedDate.getFullYear() &&
                dataDate.getMonth() === requestedDate.getMonth() &&
                dataDate.getDate() === requestedDate.getDate()
            );
        });

        if (weatherData.length === 0) {
            return res.status(404).json({ error: 'No weather data available for the specified date' });
        }

        res.json(weatherData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// Fetch and store weather data for a user's location
router.post('/:id/weather', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const { location } = user;
        const weatherData = await getWeatherData(location);
        if (!weatherData) {
            return res.status(404).json({ error: 'Weather data not available' });
        }
        user.weatherData.push(weatherData);
        await user.save();
        res.status(201).json(user.weatherData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
module.exports = router;
