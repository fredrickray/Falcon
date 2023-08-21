const knex = require("../knex-db/knex")

//creating store for a merchant
exports.createStore = async (req, res) => {
  const { name, link, email, logo } = req.body;
  if (name == '') {
    res.send('Name field must not be empty');
  }
  else if (link == '') {
    res.send('Store Link field must not be empty');
  }
  else {
    try {
      let store = await knex('Store').insert({
        name: name,
        link:  `http://localhost:9000/stores/get-store/${link}`,
        email: email,
        logo: logo,
        // "http://localhost:9000/stores/get-store/" +
      });
      res.status(201).send({
        message: 'Store created successfully',
        status: 'Success',
        store,
      });
    }
    catch (error) {
      res.send({ message: 'Failed to create store', status: 'Error', error });
    }
  }
};

exports.updateStore = async (req, res) => {
  const { id } = req.params; 
  const { name, link, logo, email } = req.body;
  
  try {
    const existingProduct = await knex('Products')
      .where({ email })
      .first();

    if (!existingProduct) {
      return res.status(404).json({ message: 'No product found with the specified email' });
    }

    const updatedRows = await knex('Store')
      .where({ id })
      .update({ name, link, logo });

    await knex("Products")
      .where({ email })
      .update({ store: name });

    if (updatedRows === 1) {
      res.status(200).json({ message: 'Store updated successfully', updatedRows });
    } else {
      res.status(404).json({ message: 'The store with this id was not found' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: 'Internal server error', err: error.message });
  }
};



//creating products
exports.createProduct = async (req, res) => {
  const { name, description, price, compare_price, email, weight, quantity, image, category, style, size, colour, store } = req.body;

    knex('Products')
      .insert({
        name,
        price,
        compare_price,
        email,
        quantity,
        description,
        weight,
        image,
        category,
        style,
        colour,
        size,
        store
      })
      .then(response => {
        res
          .status(201)
          .json({ message: 'Product created succesfully', status: 'Success', response });
      })
      .catch(err => {
        console.log(err.message)
        res
          .status(500)
          .json({ message: 'Internal server error', status: 'error', err: err.message });
      });
};


exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, compare_price, quantity, description, weight, image, category, style, colour, size } = req.body; // Assuming you're sending the updated product data in the request body

  try {
    // Update the product in the database
    const updatedRows = await knex('Products')
      .where({ id }) // Assuming your product table has an 'id' column
      .update({ name, price, compare_price, quantity, description, weight, image, category, style, colour, size });
      
    if (updatedRows === 1) {
      // Product updated successfully
      res.status(200).json({ message: 'Product updated successfully', updatedRows });
    }
    else {
      // No product found with the specified ID
      res.status(404).json({ message: 'Product not found' });
    }
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send({ message: 'Internal server error', err: error.message });
  }
};

// Controller function to get products by category
exports.getCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const products = await knex("Products").where({ category })

    // Check if products were found for the specified category
    if (products === null) {
      return res.status(404).send({ message: "No products found for the specified category." })
    }

    // Send the products as a response to the client
    res.json(products);
  }
  catch (error) {
    // If an error occurs during the database query or processing, handle the error and send an error response.
    console.log(error);
    return res.status(500).send({ message: "Internal server error", err: error.message });
  }
};

// getting all products of a merchants
exports.getProducts = async (req, res) => {
  let { email } = req.body
  try {
    let response = await knex("Products").where({ email: email })
    if (response == "") {
      res.status(404).json({ message: "No products with this email" })
    }
    else {
      let data = response
      let data2 = JSON.parse(JSON.stringify(data));
      res.status(200).json({ status: "success", message: "Products were retrieved successfully", data2 })
    }

  }
  catch (error) {
    // console.log(error)
    res.status(500).send({ status: "Server Error", message: "There was an error in the server", err: error.message })
  }
}

// getting store for the merchant
exports.store = async (req, res) => {
  const { email } = req.body

  try {
    const response = await knex("Store").where({ email })
    if(response.length === 0) {
      return res.status(404).json({ message: 'Store not found for this email' });
    }
    return res.status(200).json({
      message: 'Store retrieved successfully',
      response
    });
  } 
  catch (error) {
    res.send({message: "Internal server error", err: error})
  }
}

// getting the store of a merchant for the customer
exports.getStore = async (req, res) => {
  const name = req.params.store;

  try {
    let response = await knex("Products").where({ store: name })
    if (response == "") {
      res.status(404).json({ status: "Not found", message: "There's no Store with this name, try again" })
    }
    else {
      res.status(200).json({ status: "Success", message: "Retrieved Store for user", response })
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ status: "Error", message: err })
  }
};

exports.checkStoreExist = async (req, res) => {
  const email = req.body;

  try {
    let response = await knex("Store").where(email)
    if (response == "") {
      res.status(404).json({ status: "Not found", message: "There's no Store for this user" })
    }
    else {
      res.status(200).json({ status: "Success", message: "Retrieved Store for user", response })
    }
  }
  catch (err) {
    res.status(500).json({ status: " Inrternal Server Error", message: err })
  }
};

exports.queryProducts = async (req, res) => {
  let { q } = req.query
  const keys = ["fname", "lname", "email", "username", "phone"]


  try {
    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q))
      )
    }
    let response = await knex('Merchants')
    // console.log(q)
    res.json(search(response))
  }
  catch (error) {
    // console.log(error)
    res.status(500).send({ status: "Error", message: "There was problem retriving data" })
  }
}

exports.query3Products = async (req, res) => {
  let { q } = req.query
  const { email } = req.body

  try {
    const search = await knex("Products").where({ email })
    if (search == "") {
      res.status(404).send({ message: "email not found" })
    }
    else {
      // console.log(search.splice(0,3))
      console.log(search)
      res.send({ message: "Data retrieved", user: search })
      // res.send(search.splice)
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "server error" })
  }
}
// To get a single product for a merchant
exports.getProductID = async (req, res) => {
  const id = req.params.id;

  try {
    let response = await knex('Products').where({ id: id });
    // console.log (response);
    // res.send(response)
    if (response == '') {
      res.status(404).json({
        status: 'Not found',
        message: "There's no product with this id",
      });
    } else {
      res.status(200).json({
        status: 'Success',
        message: 'Retrieved product successfully',
        response,
      });
    }
  } catch (err) {
    res.status(500).json({ status: ' Sever Error', message: "Internal server error", err });
  }
};

//deleting a product
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.send({ message: "Thers's no id" });
  } else {
    try {
      let response = knex('Goods').where({ id }).delete();
      // console.log(response);
      if (response == '') {
        res
          .status(404)
          .json({
            status: 'Not found',
            message: "There's no id for this product",
          });
      } else {
        res
          .status(200)
          .json({
            status: 'Success',
            message: 'Product deleted succesfully',
            response,
          });
        // console.log(response);
      }
    } catch (error) {
      // console.log(error)
      res.status(400).json({ status: "Error", message: error })
    }
  }
};

// purchased item 
// itwOption are things like size, color, style
exports.itemPurchased = async (req, res) => {
  const { firstname, lastname, email, phone, itemName, itemPrice, itemOption } = req.body

  try {
    const response = await knex("Purchased").insert({
      firstname,
      lastname,
      email,
      phone,
      itemName,
      itemPrice,
      itemOption
    })
    console.log(response)
    res.send(response)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "There was a server error", error })
  }
}


exports.createOrders = async (req, res) => {
  const { orderID, totalAmount, status, deliveryFee, paymentMethod, paidBy, date } = req.body
}

//delivery information
exports.createDelivery = async (req, res) => {
  const { location, fee, email } = req.body;

  try {
    const response = await knex("Delivery").insert({ location, fee, email })
    // console.log(response)
    res.send(response)
  }
  catch (error) {
    console.log(error)
    res.status(500).send({ message: "Internal server error", error })
  }
};


exports.getDelivery = async (req, res) => {
  const { email } = req.body

  try {
    let response = await knex("Delivery").where({ email: email })
    if (response == "") {
      // console.log("Email not found")
      res.status(404).json({ message: "Email not found" })
    }
    else {
      let data = response
      let data2 = JSON.parse(JSON.stringify(data));
      // console.log({ message: "Delivery was retrived succesfully", data2 })
      res.status(200).json({ status: "success", message: "Products were retrieved successfully", data2 })
    }
  }
  catch (error) {
    res.status(500).send({ status: "Server Error", message: "There was an error in the server" })
  }
}

exports.deleteDelivery = async (req, res) => {
  const { id } = req.params

  try {
    // Use Knex to delete the item from the database based on the provided ID
    const deletedItem = await knex('Delivery').where({ id: id }).del();

    if (deletedItem === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    return res.status(200).json({ message: 'Item deleted successfully' });
  }
  catch (error) {
    console.error('Error deleting item:', error.message);
    return res.status(500).json({ message: 'Internal server error', err: error.message });
  }
}


