// Packages imports
const bcrypt = require('bcrypt');
const express = require('express');
const { query } = require('express-validator');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

// Middleware Imports
const knex = require('../knex-db/knex');
const { sendMail } = require('../middlewares/sendEmail');
const { createToken, maxAge } = require('../middlewares/createToken');
const {
  BadRequest,
  Unauthorized,
  ResourceNotFound,
} = require('../middlewares/errorHandler');

const saltRounds = 10;
const app = express();
app.use(cookieParser());

//Registering merchant

const register = async (req, res, next) => {
  const { fname, lname, email, phone, username, authType, password } = req.body;

  try {
    // Check if the user already exists in the database
    const userExist = await knex('Merchants').where({ email }).first();
    if (userExist) {
      throw new BadRequest('Email already exists, please try again');
    }

    // Hash the password
    const hash = await bcrypt.hash(password, saltRounds);

    // Generate a verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

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
      token: verificationCode,
    });

    await sendMail(
      email,
      'Email Verification Code',
      `Email Verification code is: ${verificationCode}`
    );

    // Return success response
    res.status(200).json({
      success: true,
      message: 'A verification code was sent to your email',
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  const { email, verificationCode } = req.body;

  try {
    if (!email || !verificationCode) {
      throw new BadRequest('Email and verification code are required.');
    }

    const user = await knex('Merchants').where({ email }).first();

    if (!user) {
      throw new Unauthorized('Invalid email or verification code');
    }

    if (user.verified) {
      return res.status(200).json({ message: 'Email already verified', user });
    }

    if (user.token !== verificationCode) {
      throw new Unauthorized('Invalid email or verification code');
    }

    await knex('Merchants')
      .where({ email })
      .update({ token: null, verified: true });

    res.status(200).json({
      success: true,
      message: 'Token verified',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// To Login a Merchant
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await knex('Merchants').where({ email }).first();

    if (!user) {
      throw new Unauthorized('Invalid login credentials');
    }

    // if (user.verified !== true) {
    //   // Check for null in addition to boolean false
    //   if (user.verified !== null) {
    //     return res.status(401).json({ message: 'Your account has not been verified yet.' });
    //   }
    // }

    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword);

    if (!isValid) {
      throw new Unauthorized('Invalid login credentials');
    }

    const token = createToken(user.id);

    res.cookie('jwts', token, {
      httpOnly: false,
      withCredentials: true,
      maxAge: maxAge * 1000,
    });

    return res.status(200).json({
      status: 'success',
      data: user,
      message: 'Logged in successfully',
      token,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { image, email, username, twitter, tiktok, instagram } = req.body;

  try {
    const userToUpdate = await knex('Merchants').where({ email }).first();

    if (!userToUpdate) {
      throw new ResourceNotFound('User not found. Unable to update.');
    }

    const updatedFields = { image, username, twitter, tiktok, instagram };
    const hasUpdates = Object.values(updatedFields).some(
      (value) => value !== undefined && value !== null
    );

    if (!hasUpdates) {
      BadRequest('No valid fields provided for update.');
    }

    await knex('Merchants').where({ email }).update(updatedFields);

    const updatedUser = await knex('Merchants').where({ email }).first();

    res
      .status(200)
      .json({ message: 'Social account updated', user: updatedUser });
  } catch (error) {
    next(error);
  }
};

// Adding Social details to user
const social = async (req, res) => {
  const { instagram, tiktok, twitter, email } = req.body;

  try {
    let user = await knex('Merchants').where({ email });

    if (!user) res.status(404).send({ message: 'User not found' });

    // console.log (user);
    res.send(user);
  } catch (error) {
    // console.log (error);
    res.send(error);
  }
};

// To Update Merchant's Password
const passwordReset = async (req, res, next) => {
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
    } else {
      return res.json({
        status: 'Failed',
        message: 'Email not found and password was not updated',
      });
    }
  } catch (error) {
    next(error);
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
  const { email } = req.body;
  const token = createToken();

  try {
    // await knex("Merchants").where({ email }).update({ token })

    const resetLink = `${process.env.BASE_LOCAL_URL}/reset-password?token=${token}`;
    await sendMail(
      email,
      'Password Reset Link',
      `Click on the link to reset your password: ${resetLink}`
    );

    res.status(200).json({ message: 'Reset link sent successfully!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

const newPassword = async (req, res) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ error: 'Token not found' });
    }
    const { id } = jwt.verify(token, process.env.SECRET);
    console.log(id);
    res.send(id);
  } catch (error) {
    res.json({ message: 'An error occured', error });
  }
};

module.exports = {
  register,
  verifyEmail,
  login,
  updateUser,
  social,
  passwordReset,
  forgotPassword,
};
