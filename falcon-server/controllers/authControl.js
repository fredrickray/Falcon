// const nodemailer = require ('nodemailer');
const saltRounds = 10;
const bcrypt = require ('bcrypt');
const express = require ('express');
// const session = require ('express-session');
const cookieParser = require ('cookie-parser');
const sendEmail = require ('../utls/sendEmail');
// const crypto = require ('crypto');
const app = express ();
const knex = require("../knex-db/knex")
const {createToken, maxAge} = require("../utls/createToken")
app.use (cookieParser ());



//Registering merchant
const register = async (req, res) => {
  bcrypt.hash (req.body.password, saltRounds, async (err, hash) => {
    const {fname, lname, email, phone, username, authType} = req.body;
    const password = hash;
      try {
        const userExist = await knex("Merchants").where({email}).first()
        if(userExist){
          res.status(409).send({message: "Email already exist, try again"})
        }
        else{
          let user = await knex ('Merchants').insert ({
            email,
            fname,
            lname,
            password,
            username,
            phone,
            authType
            // token,
          });
          const token = createToken (user.id);
  
          // else{
          res.cookie ('jwt', token, {
            httpOnly: true,
            withCredentials: true,
            maxAge: maxAge * 1000,
          });

          res.status (200).json ({
            success: true,
            message: 'Registration was successful',
            status: 'success',
            User: user,
            token,
          });
        }
        
        // res
        //   .status (201)
        //   .send ({message: 'An email was sent to your account, please verify'});
        // crypto.randomBytes (32).toString ('hex');
        // const url = `${process.env.BASE_URL}user/${user.id}/verify/${token}`;
        // await sendEmail (user.email, 'Verify Email', url);
        
        // console.log (user);
      } catch (error) {
        console.log (error);
        res
          .status (500)
          .json ({status: 'Error', message: 'Internal server error', error});
      }
  });
};

//To Login a Merchant
const login = async (req, res) => {
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


const update = async (req, res) =>{
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
const social = async (req, res) => {
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

const getUser = async (req, res) => {
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


module.exports= {
  register,
  login,
  update,
  social,
  getUser,
  passwordReset
}