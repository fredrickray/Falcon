const nodemailer = require('nodemailer');

// Create a transporter object for sending email
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // e.g., 'Gmail', 'Outlook', etc.
  auth: {
    user: 'hngx.teamlightning@gmail.com', // Your email address
    pass: 'esinzlxwubssbhkt', // Your email password or app-specific password
  },
});

module.exports = { transporter };
