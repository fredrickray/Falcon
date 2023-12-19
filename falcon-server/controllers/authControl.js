// Packages imports
const bcrypt = require('bcrypt');
const express = require('express');
const { query } = require("express-validator")
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

// Middleware Imports
const knex = require("../knex-db/knex")
const { sendMail } = require("../middlewares/sendEmail")
const { createToken, maxAge } = require("../middlewares/createToken")

const saltRounds = 10;
const app = express();
app.use(cookieParser());



//Registering merchant

const register = async (req, res) => {
  const { fname, lname, email, phone, username, authType, password } = req.body;

  // Validation logic for the front-end form inputs
  if (fname.length === 0) {
    res.status(400).send({message: 'First Name field cannot be empty'});
    return;
  }

  if (lname.length === 0) {
    res.status(400).send({message: 'Last Name field cannot be empty'});
    return;
  }

  if (username.length === 0) {
    res.status(400).send({message: 'Username field cannot be empty'});
    return;
  }

  if (email.length === 0) {
    res.status(400).send({message: 'Email Address cannot be empty'});
    return;
  }

  if (password.length < 8) {
    res.status(400).send({message: 'Password must be at least 8 characters long'});
    return;
  }

  let countUpperCase = 0;
  let countLowerCase = 0;
  let countDigit = 0;
  let countSpecialCharacters = 0;

  const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '[', '{', ']', '}', ':', ';', '<', '>'];

  for (let i = 0; i < password.length; i++) {
    if (specialChars.includes(password[i])) {
      countSpecialCharacters++;
    } else if (!isNaN(password[i] * 1)) {
      countDigit++;
    } else {
      if (password[i] === password[i].toUpperCase()) {
        countUpperCase++;
      }
      if (password[i] === password[i].toLowerCase()) {
        countLowerCase++;
      }
    }
  }

  if (countLowerCase === 0 || countUpperCase === 0 || countDigit === 0 || countSpecialCharacters === 0) {
    res.status(400).send({message: 'Password must include lowercase, uppercase, a number, and a special character'});
    return;
  }

  if (phone.length !== 11) {
    res.status(400).send({message: 'Phone number must be 11 characters long'});
    return;
  }

  // Proceed with the registration process if all validations pass
  try {
    // Check if the user already exists in the database
    const userExist = await knex("Merchants").where({ email }).first()
    if (userExist) {
      res.status(409).send({ message: "Email already exists, please try again" });
      return;
    }

    // Hash the password
    const hash = await bcrypt.hash(password, saltRounds);

    // Generate a verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Insert the user into the database
    await knex('Merchants').insert({
      email,
      fname,
      lname,
      password: hash,
      username,
      phone,
      authType,
      verified: false,
      token: verificationCode
    });

   
    await sendMail(email, "Email Verification Code", `Email Verification code is: ${verificationCode}` );
    
    // Return success response
    res.status(200).json({
      success: true,
      message: 'A verification code was sent to your email'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Error', message: 'Internal server error', error });
  }
};

const verifyEmail = async (req, res) => {
  const { email, verificationCode } = req.body

  try {
    if (!email || !verificationCode) {
      return res.status(400).json({
        success: false,
        message: 'Email and verification code are required.',
        data: null,
      });
    }

    const user = await knex("Merchants").where({ email, token: verificationCode })

    if (!user[0]) {
      res.status(401).send({ message: "Invalid email or verification code" })
    }
    else {
      await knex("Merchants").where({ email }).update({ token: null, verified: true })

      res.status(200).json({
        success: true,
        message: 'Token verified',
        data: user,
      });
    }
  } catch (error) {
    res.send(error.message)
  }
}

// To Login a Merchant
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await knex('Merchants').where({ email }).first();

    if (!user) {
      res.status(401).json({ message: 'Invalid login credentials' });
    } else {
      // Check if the user's account is verified
      if (!user.verified || user.verified == "false") {
        res.status(401).json({ message: 'Your account has not been verified yet.' });
      } else {
        let hashedPassword = user.password;
        let isValid = await bcrypt.compare(password, hashedPassword);
        const token = createToken(user.id);
        if (!isValid) {
          res.status(401).json({ message: 'Invalid login credentials' });
        } else {
          // res.cookie("test", true)
          res.cookie('jwts', token, {
            httpOnly: false,
            withCredentials: true,
            maxAge: maxAge * 1000,
          });
          // console.log ({user: user, token});
          res.status(200).json({
            status: 'success',
            data: user,
            message: 'Logged in successfully',
            token,
          });
        }
      }
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', err: error.message });
  }
};

const updateUser = async (req, res) => {
  const { image, email, username, twitter, tiktok, instagram } = req.body;

  try {
    const userToUpdate = await knex("Merchants")
      .where({ email })
      .first();

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found. Unable to update." });
    }

    const updatedFields = { image, username, twitter, tiktok, instagram };
    const hasUpdates = Object.values(updatedFields).some(value => value !== undefined && value !== null);

    if (!hasUpdates) {
      return res.status(400).json({ message: "No valid fields provided for update." });
    }

    await knex("Merchants")
      .where({ email })
      .update(updatedFields);

    const updatedUser = await knex("Merchants")
      .where({ email })
      .first();

    res.status(200).json({ message: "Social account updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user. Internal server error." });
  }
};

// Adding Social details to user
const social = async (req, res) => {
  const { instagram, tiktok, twitter, email } = req.body;

  try {
    let user = await knex('Merchants')
      .where({ email })

    if (!user) res.status(404).send({ message: "User not found" })

    // console.log (user);
    res.send(user);
  } catch (error) {
    // console.log (error);
    res.send(error);
  }
};

// To Update Merchant's Password
const passwordReset = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.send({
      status: 'Failed',
      message: 'Email and password are required.',
    });
  }

  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update the password in the database for the given email
    const updatedRows = await knex('Merchants')
      .where({ email: email })
      .update({ password: hashedPassword });

    if (updatedRows > 0) {
      return res.json({
        status: 'Success',
        message: 'Email found and password updated successfully',
      });
    }
    else {
      return res.json({
        status: 'Failed',
        message: 'Email not found and password was not updated',
      });
    }
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Error',
      message: 'Internal server error',
      err: error.message
    });
  }
};


// Function to generate a random token
function generateToken() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(20, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        const token = buf.toString('hex');
        resolve(token);
      }
    });
  });
}

const forgotPassword = async (req, res) => {
  const { email } = req.body
  const token = createToken()

  try {
    // await knex("Merchants").where({ email }).update({ token })

    const resetLink = `${process.env.BASE_LOCAL_URL}/reset-password?token=${token}`
    await sendMail(email, "Password Reset Link", `Click on the link to reset your password: ${resetLink}`)

    res.status(200).json({ message: 'Reset link sent successfully!' });
  } 
  catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Something went wrong.' });
  }
}

const newPassword = async (req, res) => {
  try {
    const { token } = req.headers
    if(!token) {
      return res.status(401).json({error: "Token not found"})
    }
    const { id } = jwt.verify(token, process.env.SECRET)
    console.log(id)
    res.send(id)
  } catch (error) {
    res.json({message: "An error occured", error})
  }
}

module.exports = {
  register,
  verifyEmail,
  login,
  updateUser,
  social,
  passwordReset,
  forgotPassword
}