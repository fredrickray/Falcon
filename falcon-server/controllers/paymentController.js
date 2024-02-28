const knex = require("../knex-db/knex")
const axios = require("axios")
require("dotenv").config()
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
const sdk = require('api')('@raven-atlas/v1.0#q6geo3gl7pdtgoz');


const ravenPayment = async (req, res) => {
  const { bank, amount, bank_code, currency, account_number, account_name, narration, reference } = req.body
  try {
    const response = await axios.post("https://integrations.getravenbank.com/v1/transfers/create", {
      amount,
      bank_code,
      bank,
      account_name,
      account_number,
      narration,
      reference,
      currency
    }, {
      headers: {
        Authorization: `Bearer RVSEC-TESTe24fd17275d998645746770c00c4499ecfac044994a8e084883e3e66a3fbb14201185f670d329dc414b8dcb4955e7a6b-1682685347830`
      }
    })
    console.log(response.data)
    const data = JSON.stringify(response)
    res.json(response.data)
  } 
  catch (error) {
    console.log("An error occured")
    res.send(error)
  }
}

const initiatePayment = async (req, res) => {
  const { customer_email, firstname, lastname, totalPrice, phone, logo } = req.body
  try {
    const response = await axios.post("https://api.flutterwave.com/v3/payments", {
      tx_ref: Date.now(),
      amount: totalPrice,
      currency: "NGN",
      redirect_url: "http://localhost:3000/Login",
      meta: {
        consumer_id: 23,
        consumer_mac: "92a3-912ba-1192a"
      },
      customer: {
        email: customer_email,
        phonenumber: phone,
        name: firstname + " " + lastname
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
      }
    );
    const { link } = response.data.data;
    res.status(200).send({ message: link });
  } catch (error) {
    console.error('An error occurred:', error);
    next(error);
  }

}

const initiatePaymentCallback = async (req, res) => {
  if (req.query.status === 'successful') {
    const transactionDetails = await Transaction.find({ref: req.query.tx_ref});
    const response = await flw.Transaction.verify({id: req.query.transaction_id});
    if (
        response.data.status === "successful"
        && response.data.amount === transactionDetails.amount
        && response.data.currency === "NGN") {
        // Success! Confirm the customer's payment
    } else {
        // Inform the customer their payment was unsuccessful
    }
}

};


const savePayment = async (req, res, next) => {
  let { mainData, itemsData } = req.body;

  try {
    await knex.transaction(async (trx) => {
      // Main data from the mainData object
      const {
        amount,
        currency,
        tx_ref,
        transaction_id,
        email,
        firstname,
        lastname,
        customer_email,
        status,
        shipping_money,
        discount,
        state,
        address,
        delivery_note,
      } = mainData;

      // Insert into Transactions table
      await trx('Transactions').insert({
        amount,
        currency,
        tx_ref,
        transaction_id,
        customer_email,
        email,
        firstname,
        lastname,
        status,
      });

      // Insert into Orders table
      await trx('Orders').insert({
        firstname,
        lastname,
        email: customer_email,
        my_email: email,
        tx_ref,
        shipping_money,
        total_amount: amount,
        discount,
        state,
        address,
        delivery_note,
        status,
      });

      // Insert order details from the itemsData array
      await Promise.all(
        itemsData.map(async (item) => {
          await trx('Order_details').insert({
            product_Id: item.product_Id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            tx_ref,
          });

          // Decrement product quantity in Product table
          await trx('Products')
            .where('id', item.product_Id)
            .decrement('quantity', item.quantity);
        })
      );
    });

    res.status(201).send({ message: 'Transaction completed successfully' });
  } catch (error) {
    // console.log(error.message);
    next(error);
  }
};

const getPayments = async (req, res, next) => {
  const { email } = req.query;

  try {
    const response = await knex('Transactions').where({ email });
    // console.log(response);

    if (response.length === 0) {
      throw new ResourceNotFound('No transactions found for this email');
    }
    return res
      .status(200)
      .send({ message: 'Transactions retrieved successfully', response });
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  const { my_email } = req.body;

  try {
    const orderItems = await knex('Orders').where({ my_email });

    if (orderItems.length === 0) {
      throw new ResourceNotFound('No order items found for the provided email');
    }

    res
      .status(200)
      .json({ message: 'Items retrieved succesfully', orderItems });
  } catch (error) {
    next(error);
  }
};

const getOrdersByTxRef = async (req, res, next) => {
  const { tx_ref } = req.params;

  try {
    const orders = await knex('Orders').where({ tx_ref });

    if (orders.length === 0) {
      throw new ResourceNotFound('No orders found for the provided tx_ref');
    }

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

const getItemsByTxRef = async (req, res, next) => {
  const { tx_ref } = req.params;

  try {
    const items = await knex('Order_details').where({ tx_ref });

    if (items.length === 0) {
      throw new ResourceNotFound('No items found for the provided tx_ref');
    }

    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

const deletePayment = async (req, res, next) => {
  const { id } = req.params;

  try {
    const response = await knex('Transactions').where({ id }).del();
    console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteOrderById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedRows = await knex('Orders').where({ id }).del();

    if (deletedRows === 0) {
      throw new ResourceNotFound('Order not found for the provided ID');
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    // console.error(error);
    next(error);
  }
};

const deleteItemById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedRows = await knex('Order_details').where({ id }).del();

    if (deletedRows === 0) {
      throw new ResourceNotFound('Item not found for the provided ID');
    }

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    // console.error(error);
    next(error);
  }
};

const getAllPayments = async (req, res, next) => {
  try {
    const response = knex.select().from('Transactions');
    console.log(response);
    res.send(response);
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

module.exports = {
  ravenPayment,
  initiatePayment,
  initiatePaymentCallback,
  savePayment,
  getPayments,
  getAllOrders,
  getOrdersByTxRef,
  getItemsByTxRef,
  deletePayment,
  deleteOrderById,
  deleteItemById,

  getAllPayments,
};
