// const nodemailer = require ('nodemailer');
const saltRounds = 10;
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const express = require ('express');
// const session = require ('express-session');
const cookieParser = require ('cookie-parser');
const sendEmail = require ('../utls/sendEmail');
const crypto = require ('crypto');
const app = express ();
const knex = require("../knex-db/knex")
const {createToken, maxAge} = require("../utls/createToken")
app.use (cookieParser ());


// to use the passport oauth

// Creating tokens
// const maxAge = 3 * 24 * 60 * 60;
// const createToken = id => {
//   return jwt.sign ({id}, process.env.SECRET, {
//     expiresIn: maxAge,
//   });
// };


//Registering merchant
exports.register = async (req, res) => {
  bcrypt.hash (req.body.password, saltRounds, async (err, hash) => {
    const {fname, lname, email, phone, username} = req.body;
    const password = hash;
    let emailCheck = await knex ('Merchants').where ({email}).first ();
    // let emailCheck = await knex("").where({email: email})
    if (fname == '') {
      res.send ({message: 'Firstname field must not be empty'});
    } else if (fname.length < 4) {
      res.send ({message: 'Firname, a minimum of 4 chracters'});
    } else if (lname == '') {
      res.send ({message: 'Lastname field must not be empty'});
    } else if (lname.length <= 4) {
      res.send ({message: 'Lastname, a minimum of 4 chracters'});
    } else if (username == '') {
      res.send ({message: 'Username field must not be empty'});
    } else if (username.length < 2) {
      res.send ({
        message: 'Username field must have a minimum of 2 characters',
      });
    } else if (email == '') {
      res.send ({meesage: 'Email field must not be empty'});
    } else if (emailCheck == email) {
      res.send ({message: 'Email already exist, try another one'});
    } else if (password == '') {
      res.send ({message: 'Password field must not be empty'});
    } else if (password.length <= 4) {
      res.send ({message: 'A mininmum of 8 chracters is required'});
    } else if (phone == '') {
      res.send ({message: 'Enter a valid phone number'});
    } else if (phone.length < 11 || phone.length > 11) {
      res.send ({message: 'Phone number must be 11 digits'});
    } else {
      try {
        let user = await knex ('Merchants').insert ({
          email,
          fname,
          lname,
          password,
          username,
          phone,
          // token,
        });
        const token = createToken (user.id);

        // else{
        res.cookie ('jwt', token, {
          httpOnly: true,
          withCredentials: true,
          maxAge: maxAge * 1000,
        });
        // res
        //   .status (201)
        //   .send ({message: 'An email was sent to your account, please verify'});
        // crypto.randomBytes (32).toString ('hex');
        // const url = `${process.env.BASE_URL}user/${user.id}/verify/${token}`;
        // await sendEmail (user.email, 'Verify Email', url);
        res.status (200).json ({
          success: true,
          message: 'Registration was successful',
          status: 'success',
          User: user,
          token,
        });
        // console.log (user);
      } catch (error) {
        console.log (error);
        res
          .status (500)
          .json ({status: 'Server Error', message: 'There was a server error', error});
      }
    }
  });
};

//To Login a Merchant
exports.login = async (req, res) => {
  const {email, password} = req.body;

  try {
    let user = await knex ('Merchants').where ({email}).first ();

    if (!user) {
      res.status (401).json ({message: 'Wrong email or passsword, try again'});
    } else {
      let hashedPassword = user.password;
      let isValid = await bcrypt.compare (password, hashedPassword);
      const token = createToken (user.id);
      if (!isValid) {
        res.status (401).json ({message: 'Wrong email or password, try again'});
      } else {
        // res.cookie("test", true)
        res.cookie ('jwts', token, {
          httpOnly: true,
          withCredentials: true,
          maxAge: maxAge * 1000,
        });
        // console.log ({user: user, token});
        res.status (200).json ({
          status: 'success',
          data: user,
          message: 'Logged in successfully',
          token,
        });
      }
    }
  } 
  catch (error) {
    res.status(500).send({message: "Internal server error", err: error.message})
  }
};


exports.update = async (req, res) =>{
  const { image, email, username } = req.body

  try {
    let user = await knex("Merchants")
      .where({email: email})
      // .first()
      
      if (!user || user === "") {
        res.status(404).send({ message: "Can't update, user not found" });
        console.log("Can't update, user not found");
      } 
      else {
        await knex("Merchants")
          .where({ email: email })
          .update({ image: image, username });
      
        res.status(200).send({ message: "Updated successfully", status: "success", user })
        // console.log(user)
      }
      
  } 
  catch (error) {
    res.status(500).send({message: "Internal server error", err: error.message})
  }
}

// Adding Social details to user
exports.social = async (req, res) => {
  const {instagram, tiktok, twitter, email} = req.body;

  try {
    let user = await knex ('Socials').insert ({
      instagram,
      twitter,
      tiktok,
      email,
    });

    // console.log (user);
    res.send (user);
  } catch (error) {
    // console.log (error);
    res.send (error);
  }
};

exports.getUser = async (req, res) => {
  const { email } = req.body

  try {
    const user = await knex("Merchants").where({email});
    if(!user || user == ""){
      res.status(404).send({message: "Email not found"})
      // console.log("Email not found")
    }
    else{
      res.status(200).send({message: "User found", user})
    }
  } 
  catch (error) {
    // console.log(error)
    res.status(500).send({message: "There was a server error", error})
  }
}
// To get all Merchants
exports.users = async (req, res) => {
  const id = req.body.id;

  try {
    let user = await knex.select ().from ('Merchants');
    // console.log(user)
    if (user) {
      // console.log (user);
      res.send ({message: 'Users retrived', user});
    } else {
      res.send ({message: 'Users were not retrived'});
    }
  } catch (err) {
    console.log (err);
  }
};

// To Update Merchant's Password
exports.passwordReset = async (req, res) => {
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
    const saltRounds = 10; // You can adjust this value based on your requirements
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