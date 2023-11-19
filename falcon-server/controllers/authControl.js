const saltRounds = 10;
// Packages imports
const bcrypt = require('bcrypt');
const express = require('express');
// const { query } = require("express-validator")
const cookieParser = require('cookie-parser');

// Middleware Imports
const knex = require('../knex-db/knex');
const transporter = require('../middlewares/sendEmail');
const { createToken, maxAge } = require('../middlewares/createToken');
const { Conflict } = require('../middlewares/errorHandler');

const app = express();
app.use(cookieParser());

//Registering merchant
const register = async (req, res, next) => {
  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    const { fname, lname, email, phone, username, authType } = req.body;
    // Generate a random verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const password = hash;
    try {
      const userExist = await knex('Merchants').where({ email }).first();
      if (userExist) {
        throw new Conflict('Email already exist, try again');
      } else {
        let user = await knex('Merchants').insert({
          email,
          fname,
          lname,
          password,
          username,
          phone,
          authType,
          verified: false,
          token: verificationCode,
        });
        const token = createToken(user.id);

        // else{
        res.cookie('jwt', token, {
          httpOnly: true,
          withCredentials: true,
          maxAge: maxAge * 1000,
        });

        const mailOptions = {
          from: 'fredrickraymond2004@gmail.com',
          to: email,
          subject: 'Email Verification',
          text: `Your verification code is: ${verificationCode}`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({
          success: true,
          message: 'A verification code was sent to your email',
          // status: 'success',
          // User: user,
          // token,
        });
      }

      // console.log (user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
};

const verifyEmail = async (req, res) => {
  const { email, verificationCode } = req.body;

  try {
    if (!email || !verificationCode) {
      return res.status(400).json({
        success: false,
        message: 'Email and verification code are required.',
        data: null,
      });
    }

    const user = await knex('Merchants').where({
      email,
      token: verificationCode,
    });

    if (!user[0]) {
      res.status(401).send({ message: 'Invalid email or verification code' });
    } else {
      await knex('Merchants')
        .where({ email })
        .update({ token: null, verified: true });

      res.status(200).json({
        success: true,
        message: 'Token verified',
        data: user,
      });
    }
  } catch (error) {
    res.send(error.message);
  }
};

// To Login a Merchant
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await knex('Merchants').where({ email }).first();

    if (!user) {
      res.status(401).json({ message: 'Invalid login credentials' });
    } else {
      // Check if the user's account is verified
      if (!user.verified || user.verified == 'false') {
        res
          .status(401)
          .json({ message: 'Your account has not been verified yet.' });
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
    res
      .status(500)
      .send({ message: 'Internal server error', err: error.message });
  }
};

const update = async (req, res) => {
  const { image, email, username, twitter, tiktok, instagram } = req.body;

  try {
    let user = await knex('Merchants').where({ email: email });

    if (!user || user === '') {
      res
        .status(404)
        .send({ success: false, message: "Can't update, user not found" });
      console.log("Can't update, user not found");
    } else {
      await knex('Merchants')
        .where({ email: email })
        .update({ image, username, twitter, tiktok, instagram });

      res
        .status(200)
        .send({ message: 'Updated successfully', status: 'success', user });
    }
  } catch (error) {
    // res.status(500).send({message: "Internal server error", err: error.message})
    res.send(error.message);
  }
};

// Adding Social details to user
const social = async (req, res) => {
  const { instagram, tiktok, twitter, email } = req.body;

  try {
    let user = await knex('Merchants').where({ email });

    if (!user)
      res.status(404).send({ success: false, message: 'User not found' });

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
      success: false,
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
    console.log(error);
    return res.status(500).json({
      status: 'Error',
      message: 'Internal server error',
      err: error.message,
    });
  }
};

module.exports = {
  register,
  verifyEmail,
  login,
  update,
  social,
  passwordReset,
};
