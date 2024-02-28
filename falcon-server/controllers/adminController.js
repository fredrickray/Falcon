const saltRounds = 10;
const bcrypt = require('bcrypt');
const knex = require('../knex-db/knex');
const { createToken, maxAge } = require('../helpers/createToken');
const {
  ResourceNotFound,
  ServerError,
  BadRequest,
  Unauthorized,
} = require('../middlewares/errorHandler');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await knex('Admin').where({ email }).first();

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
    } else {
      let hashedPassword = user.password;
      let isValid = await bcrypt.compare(password, hashedPassword);

      if (!isValid) {
        throw new Unauthorized('Invalid credentials');
      }

      const token = createToken(user.id);

      res.cookie('jwts', token, {
        httpOnly: true,
        withCredentials: true,
        maxAge: maxAge * 1000,
      });

      res.status(200).json({
        status: 'success',
        data: user,
        message: `Welcome back ${user.firstname}`,
        token,
      });
    }
  } catch (error) {
    next(error);
  }
};

// To Update Merchant's Password
const passwordReset = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    throw new Unauthorized('Email and password are required.');
  }

  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update the password in the database for the given email
    const updatedRows = await knex('Admin')
      .where({ email: email })
      .update({ password: hashedPassword });

    if (updatedRows > 0) {
      return res.json({
        status: 'Success',
        message: 'Email found and password updated successfully',
      });
    }
    throw new ResourceNotFound('Email not found and password was not updated');
  } catch (error) {
    console.log(error);
    next(error);
    // return res.status(error).json({
    //   status: 'Error',
    //   message: 'Internal server error',
    //   err: error.message
    // });
  }
};

// get all merchants
const getMerchants = async (req, res, next) => {
  try {
    // Retrieve user data from the "Merchants" table
    const users = await knex.select().from('Merchants');

    if (users.length > 0) {
      // Respond with success and the retrieved users
      res.status(200).json({ message: 'Users retrieved', users });
    }
    // Respond with a not found status and message
    throw new ResourceNotFound('No users found');
  } catch (error) {
    next(error);
  }
};

const getMerchantId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await knex('Merchants').where({ id });
    if (response.length === 0) {
      throw new ResourceNotFound('User does not exist');
    }

    return res.status(200).json(response);
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

// get all orders for all merchants
const getOrders = async (req, res, next) => {
  try {
    // Retrieve all data from the "Order" table
    const orders = await knex.select().from('Orders');

    if (orders.length > 0) {
      // Respond with success and the retrieved users
      res.status(200).json({ message: 'Orders retrieved succesfully', orders });
    }
    // Respond with a not found status and message
    throw new ResourceNotFound('No orders found');
  } catch (error) {
    // Handle any errors that occur during the database query or response sending
    next(error);
  }
};

const getOrderId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await knex('Orders').where({ id });
    if (response.length === 0) {
      throw new ResourceNotFound('Order does not exist');
    }
    return res.status(200).json(response);
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

// getting all stores for all merchants
const getStores = async (req, res, next) => {
  try {
    let stores = await knex.select().from('Store');

    if (!stores) {
      throw new ResourceNotFound('Stores not found');
    }

    res.status(200).json({
      message: 'All stores were successfully retrieved',
      status: 'Success',
      data: stores,
    });
  } catch (error) {
    // console.log(err)
    next(error);
  }
};

// retrieving a particular store by id
const getStoreID = async (req, res, next) => {
  let { name, id } = req.body;

  try {
    let response = await knex('Store').where({ name, id });
    if (response) {
      // console.log(response);
      res.status(200).json({
        status: 'Success',
        message: 'Store retrieved successfully',
        response,
      });
    }
    throw new ServerError();
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

// retrieve all transaction for all Merchants
const getTransaction = async (req, res, next) => {
  try {
    let data = await knex.select().from('Transactions');
    if (data.length > 0) {
      // console.log(data)
      res
        .status(200)
        .send({ message: 'Transaction successfully retrieved', data });
    }
    throw new ResourceNotFound('Payments information were not retrieved');
  } catch (err) {
    // console.log(err)
    next(error);
  }
};

const getTransactionId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await knex('Transactions').where({ id });
    if (response.length === 0) {
      throw new ResourceNotFound('No payment found');
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const getMultipleTable = async (req, res, next) => {
  const { email } = req.query;
  try {
    if (!email) {
      throw new BadRequest('Email is required in the request body');
    }
    const response = await knex('Merchants')
      .select('*')
      .where('Merchants.email', email)
      .join('Transactions', 'Merchants.email', '=', 'Transactions.email')
      .join('Products', 'Merchants.email', '=', 'Products.email');

    if (response.length === 0) {
      throw new ResourceNotFound('Email not found');
    }

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const testMultipleRequest = async (req, res, next) => {
  try {
    const { email } = req.body;

    await knex.transaction(async (trx) => {
      await trx('Transactions').where({ email });
      await trx('Products').where({ email });
      await trx('Merchants').where({ email });

      await Promise.all(async());
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  passwordReset,
  getMerchants,
  getMerchantId,
  getOrders,
  getOrderId,
  getTransaction,
  getTransactionId,
  getMultipleTable,
};
