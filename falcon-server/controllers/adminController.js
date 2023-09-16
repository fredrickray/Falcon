const saltRounds = 10;
const bcrypt = require ('bcrypt');
const express = require ('express');
// const session = require ('express-session');
const cookieParser = require ('cookie-parser');

const app = express ();
// const knex = require("../knex-db/knex")
const {createToken, maxAge} = require("../utls/createToken")
app.use (cookieParser ());

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'Falcon',
  },
});

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

// get all merchants
const getMerchants = async (req, res) => {
  try {
    // Retrieve user data from the "Merchants" table
    const users = await knex.select().from('Merchants');

    if (users.length > 0) {
      // Respond with success and the retrieved users
      res.status(200).json({ message: 'Users retrieved', users });
    } else {
      // Respond with a not found status and message
      res.status(404).json({ message: 'No users found' });
    }
  } catch (error) {
    // Handle any errors that occur during the database query or response sending
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getMerchantId = async (req, res) => {
  try {
    const { id } = req.params

    const response = await knex("Merchants").where({ id });
    if(response.length === 0) {
      return res.status(404).json({message:"User does not exist"})
    }
    else{
      return res.status(200).json(response)
    }
  } 
  catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error', err: error.message });
  }
}

// get all orders for all merchants
const getOrders = async (req, res) => {
  try {
    // Retrieve user data from the "Merchants" table
    const orders = await knex.select().from('Orders');

    if (orders.length > 0) {
      // Respond with success and the retrieved users
      res.status(200).json({ message: 'Orders retrieved succesfully', users });
    } else {
      // Respond with a not found status and message
      res.status(404).json({ message: 'No users found' });
    }
  } catch (error) {
    // Handle any errors that occur during the database query or response sending
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getOrderId = async (req, res) => {
  try{
    const { id } = req.params

    const response = await knex("Orders").where({ id })
    if(response.length === 0) {
      return res.status(404).json({message:'Order does not exist'})
    }
    else{
      return res.status(200).json(response)
    }

  } 
  catch(error) {
    console.log(error)
    res.status(500).send({message: "Internal server error", err: error.message})
  }
}

// getting all stores for all merchants
const getStores = async (req, res) => {

  try {
    let data = await knex.select().from("Store")

    if (data) {
      // console.log(data)
      res.send({ message: "All stores were successfully retrieved", status: "Success", data })
    }
    else {
      res.send({ messsage: "Stors were not retrieved", status: "Failed" })
    }
  }
  catch (err) {
    // console.log(err)
    res.send({ message: "There was an error retrieving data", status: "Error" })
  }
}

// retrieving a particular store by id
const getStoreID = async (req, res) => {
  let { name, id } = req.body;

  try {
    let response = await knex('Store').where({ name, id });
    if (response) {
      // console.log(response);
      res.status(200).json({
        status: 'Success',
        message: 'The single store was retrieved successfully',
        response,
      });
    } else {
      res.json({ status: 'Failed', message: 'Something went wrong' });
    }
  } catch (error) {
    // console.log(error);
    res.send({ status: 'Error', message: 'An error occured' });
  }
};

// retrieve all transaction for all Merchants
const getTransaction = async (req, res) => {
  try {
    let data = await knex.select().from("Transactions")
    if (data.length > 0) {
      // console.log(data)
      res.status(200).send({ message: "Transaction successfully retrieved", data })
    }
    else {
      res.status(404).send({ messsage: "Payments information were not retrieved", })
    }
  }
  catch (err) {
    // console.log(err)
    res.status(500).send({ message: "Internal server error", error: err.message })
  }
}

const getTransactionId = async (req, res) => {
  try {
    const { id } = req.params

    const response = await knex("Transactions").where({ id })
    if(response.length === 0) {
      res.status(404).send({messsage:"No payment found"})
    }
    else{
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: err.message })

  }
}

module.exports = {
  login,
  getMerchants,
  getMerchantId,
  getOrders,
  getOrderId,
  getTransaction,
  getTransactionId
}