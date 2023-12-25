const nodemailer = require('nodemailer');

// Create a transporter object for sending email
const sendMail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'hngx.teamlightning@gmail.com',
      pass: 'esinzlxwubssbhkt',
    },
  });

  const mailOption = {
    from: 'fredrickraymond2004@gmail.com',
    to: email,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOption);
    console.log('Email sent successfully');
  } catch (error) {
    console.log('error sending email:', error);
    throw new Error('Error sending email');
  }
};

module.exports = { sendMail };
