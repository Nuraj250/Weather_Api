const nodemailer = require('nodemailer');

const sendHourlyWeatherReport = async (user) => {
    // Create a Nodemailer transporter using your email service (e.g., Gmail)
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'YOUR_EMAIL@gmail.com',
            pass: 'YOUR_PASSWORD',
        },
    });

    // Define email content
    const mailOptions = {
        from: 'YOUR_EMAIL@gmail.com',
        to: user.email,
        subject: 'Hourly Weather Report',
        text: 'Here is your hourly weather report...', // Add weather data here
    };

    // Send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendHourlyWeatherReport;
