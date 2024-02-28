// const nodemailer = require('nodemailer');
// const renderMJMLTemplate = require("../utils/mjmlUtils");

// // Create a transporter object for sending email
// const sendMail = async (email, subject, props) => {
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: 'hngx.teamlightning@gmail.com',
//       pass: 'esinzlxwubssbhkt',
//     },
//   });

//   // Define the MJML template file path
//   const mjmlTemplatePath = path.resolve(__dirname, process.env.MJML_TEMPLATE_PATH || '../mail-template/emailVerification.mjml');

//   // Render the MJML template with props
//   const htmlContent = renderMJMLTemplate(mjmlTemplatePath, props);

//   const mailOption = {
//     from: 'fredrickraymond2004@gmail.com',
//     to: email,
//     subject,
//     html: htmlContent,
//   };

//   try {
//     await transporter.sendMail(mailOption);
//     console.log('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw new Error('Error sending email');
//   }
// };

// module.exports = { sendMail };




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