const fetch = require('node-fetch');

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';

const getWeatherData = async (location) => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        // Extract relevant weather information from the response and return it
        const weatherData = {
            temperature: data.main.temp,
            description: data.weather[0].description,
            // Add other weather data fields here
        };
        return weatherData;
    } catch (error) {
        throw error;
    }
};

module.exports = getWeatherData;
