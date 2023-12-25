// Packages imports
const bcrypt = require('bcrypt');
const express = require('express');
// const { query } = require("express-validator")
const cookieParser = require('cookie-parser');

// Middleware Imports
const knex = require('../knex-db/knex');
const transporter = require('../helpers/sendEmail');
const { createToken, maxAge } = require('../helpers/createToken');
const {
  Conflict,
  BadRequest,
  Unauthorized,
} = require('../middlewares/errorHandler');
const { sendVerificationEmail } = require('../helpers/mailService');

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
          authType: 'email',
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

        await sendVerificationEmail(fname, email, verificationCode);

        res.status(201).json({
          success: true,
          message: 'A verification code was sent to your email',
          // status: 'success',
          // User: user,
          // token,
        });
      }

      // console.log (user);
    } catch (error) {
      next(error);
    }
  });
};

const verifyEmail = async (req, res, next) => {
  const { email, verificationCode } = req.body;

  try {
    const user = await knex('Merchants').where({
      email,
      token: verificationCode,
    });

    if (!user[0]) {
      throw new Unauthorized('Invalid email or verification code');
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

    // Check if the user's account is verified
    if (!user.verified) {
      throw new Unauthorized('Your account has not been verified yet.');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Unauthorized('Invalid login credentials');
    }

    const token = createToken(user.id);

    // Omit password from the response
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    res.cookie('jwts', token, {
      httpOnly: true,
      withCredentials: true,
      maxAge: maxAge * 1000,
    });

    res.status(200).json({
      status: 'success',
      data: userWithoutPassword,
      message: 'Logged in successfully',
      token,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { image, email, username, twitter, tiktok, instagram } = req.body;

  try {
    let user = await knex('Merchants').where({ email: email });

    if (!user || user === '') {
      throw new BadRequest("Can't update, user not found");
    } else {
      await knex('Merchants')
        .where({ email: email })
        .update({ image, username, twitter, tiktok, instagram });

      res
        .status(200)
        .send({ message: 'Updated successfully', status: 'success', user });
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
      return res.status(401).json({ message: 'Invalid login credentials' });
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
    // res.status(500).send({message: "Internal server error", err: error.message})
    next(error);
  }
};

// Adding Social details to user
const social = async (req, res, next) => {
  const { instagram, tiktok, twitter, email } = req.body;

  try {
    let user = await knex('Merchants').where({ email });

    if (!user) throw new BadRequest('User not found');

    // console.log (user);
    res.send(user);
  } catch (error) {
    // console.log (error);
    next(error);
  }
};

// To Update Merchant's Password
const passwordReset = async (req, res, next) => {
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
      throw new Unauthorized('Email not found and password was not updated');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  verifyEmail,
  login,
  updateUser,
  social,
  passwordReset,
};
