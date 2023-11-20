const { transporter } = require('./sendEmail');

async function sendVerificationEmail(name, recipient, verificationCode) {
  const mailOptions = {
    from: 'fredrickraymond2004@gmail.com',
    to: recipient,
    subject: 'Email Verification',
    text: `Hello ${name}. <br/>Your verification code is: ${verificationCode}`,
  };

  try {
    // Send the email
    const response = await transporter.sendMail(mailOptions);

    if (response.accepted.length > 0) {
      console.log('Verification email sent successfully.');
    } else {
      console.error('Failed to send verification email.');
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = { sendVerificationEmail };
