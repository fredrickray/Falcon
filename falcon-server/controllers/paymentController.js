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



// const savePayment = async (req, res) => {
//     let { product_Id, name, quantity, amount, currency, tx_ref, transaction_id, email, firstname, lastname, customer_email, status, price, shipping_money, discount, state, address, delivery_note }= req.body;

//     try {
//       await knex.transaction(async (trx) => {
//         await trx("Transactions").insert({ amount, currency, tx_ref, transaction_id, customer_email, email, firstname, lastname, status });

//         await trx("Orders").insert({ firstname, lastname, email: customer_email, tx_ref, shipping_money, total_amount: amount, discount, state, address, delivery_note, status });

//         await trx("Order_details").insert({ product_Id, name, price, quantity, tx_ref });

//       });

//       // console.log(response)
//       res.status(201).send({message: "Transaction completed succesfully"})
//     } 
//     catch (error) {
//       console.log(error.message)
//       res.status(500).send({ message: "Internal server error", err: error.message })
//     }
// }

const savePayment = async (req, res) => {
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
      await trx("Transactions").insert({
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
      await trx("Orders").insert({
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
          await trx("Order_details").insert({
            product_Id: item.product_Id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            tx_ref,
          });

          // Decrement product quantity in Product table
          await trx("Products")
            .where("id", item.product_Id)
            .decrement("quantity", item.quantity);
        })
      );
    });

    res.status(201).send({ message: "Transaction completed successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal server error", err: error.message });
  }
};


const getPayments = async (req, res) => {
  const { email } = req.query;

  try {
    const response = await knex("Transactions").where({ email });
    console.log(response);

    if (response.length === 0) {
      return res.status(404).send({ message: "No transactions found for this email" });
    } else {
      return res.status(200).send({ message: "Transactions retrieved successfully", response });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error", err: error.message });
  }
};

const getAllOrders = async (req, res) => {
  const { my_email } = req.body;

  try {
    const orderItems = await knex("Orders")
      .where({ my_email })

    if (orderItems.length === 0) {
      return res.status(404).json({ message: "No order items found for the provided email" });
    }

    res.status(200).json({ message: "Items retrieved succesfully", orderItems });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const getOrdersByTxRef = async (req, res) => {
  const { tx_ref } = req.params;

  try {
    const orders = await knex("Orders").where({ tx_ref });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for the provided tx_ref" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving orders", error: error.message });
  }
};

const getItemsByTxRef = async (req, res) => {
  const { tx_ref } = req.params;

  try {
    const items = await knex("Order_details").where({ tx_ref });

    if (items.length === 0) {
      return res.status(404).json({ message: "No items found for the provided tx_ref" });
    }

    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving items", error: error.message });
  }
};

const deletePayment = async (req, res) => {
  const { id } = req.params

  try {
    const response = await knex("Transactions").where({ id }).del()
    console.log(response)
    res.send(response)
  }
  catch (error) {
    console.log(error)
    res.status(500).send({ message: "Internal server error", error })
  }
}

const deleteOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await knex("Orders").where({ id }).del();

    if (deletedRows === 0) {
      return res.status(404).json({ message: "Order not found for the provided ID" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting order", error: error.message });
  }
};

const deleteItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await knex("Order_details").where({ id }).del();

    if (deletedRows === 0) {
      return res.status(404).json({ message: "Item not found for the provided ID" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting item", error: error.message });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const response = knex.select().from("Transactions")
    console.log(response)
    res.send(response)
  }
  catch (error) {
    console.log(error)
    res.status(500).send({ message: "Internal server error", err: error.message })
  }
}

module.exports = {
  savePayment,
  getPayments,
  getAllOrders,
  getOrdersByTxRef,
  getItemsByTxRef,
  deletePayment,
  deleteOrderById,
  deleteItemById,

  getAllPayments
}