const knex = require("../knex-db/knex")
const {
  BadRequest,
  Unauthorized,
  ResourceNotFound,
} = require('../middlewares/errorHandler');

//creating store for a merchant
const createStore = async (req, res, next) => {
  const { name, link, email, logo } = req.body;
    try {
      const storeExist = await knex("Store").where({name}).first()
      if(storeExist) {
        throw new BadRequest("Store name already exist, try again")
      }

      let store = await knex('Store').insert({
        name: name,
        link: `http://localhost:9000/store/${link}`,
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
      next(error)
    }
};

const updateStore = async (req, res) => {
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

const createCategory = async (req, res) => {
  try {
    const { collection, description, store } = req.body

    const response = await knex("Collections").insert({ name: collection, description, store })
    res.send(response)
  }
  catch (error) {
    res.send(error)
  }
}

// retrieving collection for a merchant
const getCategory = async (req, res) => {
  const { collection } = req.params
  try {
    const response = await knex("Collection").where({ collection })
    if (response == "") {
      res.status(404).send({ message: "No collection with that name" })
    }
    else {
      res.send({ response })
    }

  } catch (error) {
    res.send(error)
  }
}

// Saving customization data
const saveCustomization = async (req, res) => {
  try {
    const { logo, color, theme, banner, email } = req.body

    const response = await knex("").where({ email })
    if (response) {
      knex.insert({
        color,
        logo,
        theme,
        banner,
      })
    }
    else { }
    res.status(200).send({ message: "Customization saved" })
  } catch (error) {
    res.send(error)
  }
}

//creating products
const createProduct = async (req, res) => {
  const { name, description, price, compare_price, email, weight, quantity, image, collection, style, size, colour, store } = req.body;

  try {
    const response = await knex('Products')
      .insert({
        name,
        price,
        compare_price,
        email,
        quantity,
        description,
        weight,
        image,
        collection,
        style,
        colour,
        size,
        store,
      })

    // await knex("Collection")
    //   .insert({
    //     collection,
    //     productName: name,
    //     productPrice: price,
    //     productWeight: weight,
    //     productQuantity: quantity,
    //     productImage: image,
    //     productStyle: style,
    //     productSize: size,
    //     productColour: colour,
    //     store
    //   })
    res.status(201).send({ message: "Product created succesfully", status: "Success", response })
  }
  catch (error) {
    // res.status(500).send({message: "Internal serer error", err: error.message})
    res.send(error)
  }
};


const updateProduct = async (req, res) => {
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

// getting all products of a merchants
const getProducts = async (req, res) => {
  let { email } = req.query
  try {
    let response = await knex("Products").where({ email })
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
const store = async (req, res) => {
  const { email } = req.query
  // console.log(re.)

  try {
    const response = await knex("Store").where({ email })
    if (response.length === 0) {
      return res.status(404).json({ message: 'Store not found for this email' });
    }
    return res.status(200).json({
      message: 'Store retrieved successfully',
      response
    });
  }
  catch (error) {
    res.send({ message: "Internal server error", err: error })
  }
}

// getting the store of a merchant for the customer
const getStore = async (req, res) => {
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

const queryProducts = async (req, res) => {
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

// To get a single product for a merchant
const getProductID = async (req, res) => {
  const { id } = req.params

  try {
    let response = await knex('Products').where({ id });
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
const deleteProduct = async (req, res) => {
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

const createDiscount = async (req, res) => {
  const { email, name, price } = req.body

  try {
    const response = await knex("Discounts").insert({ name, price, email })
    console.log(response)
    res.send(response)
  }
  catch (error) {
    console.log(error)
    res.status(500).send({ message: "Internal server error", error })
  }
}

const getDiscounts = async (req, res) => {
  const { email } = req.query;

  try {
    const [discounts] = await knex("Discounts").where({ email });

    if (discounts.length === 0) {
      res.status(404).json({ message: "No discounts found for the provided email" });
    } else {
      console.log(discounts)
      res.status(200).json({ message: "Discounts retrieved successfully", discounts });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", err: error.message });
  }
};

const deleteDiscount = async (req, res) => {
  const { id } = req.params; // Assuming the discount's unique identifier is passed as a parameter

  try {
    const response = await knex("Discounts").where({ id: id }).del();
    if (response === 0) {
      res.status(404).json({ message: "Discount not found" });
    } else {
      res.status(200).send({ message: "Discount deleted" }); // Status 204 means "No Content" after successful deletion
    }
  } catch (error) {
    res.status(500).json({ status: "Server Error", message: "There was an error in the server" });
  }
};

//delivery information
const createDelivery = async (req, res) => {
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

const updateDelivery = async (req, res) => {
  const { location, fee, email } = req.body;

  try {
    const response = await knex('Delivery')
      .where({ email })
      .update({ location, fee });

    if (response === 0) {
      return res.status(404).json({ message: 'Delivery info does not exist.' });
    }

    return res.status(200).json({ message: 'Delivery updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred', error });
  }
};


const getDelivery = async (req, res) => {
  const { email } = req.query

  try {
    let response = await knex("Delivery").where({ email })

    if (!response || response.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    const data = JSON.parse(JSON.stringify(response));
    return res.status(200).json({ status: "success", message: "Products were retrieved successfully", data });
  }
  catch (error) {
    console.log(error)
    res.send(error)
    // res.status(500).send({ status: "Server Error", message: "There was an error in the server" })
  }
}

const deleteDelivery = async (req, res) => {
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

// Create a review
const createReview = async (req, res) => {
  const { name, description, rating } = req.body

  try {
    const response = await knex("Reviews")
    insert({
      name,
      description,
      rating
    })

    res.send(response)
  } catch (error) {
    res.send({ message: "Error occured while creating a review", error })
  }
}

const getReviews = async (req, res) => {
  const { id } = req.query

  try {
    const response = await knex("Reviews").where({ id })
    res.send(response)
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  createStore,
  updateStore,
  createCategory,
  getCategory,
  saveCustomization,
  createProduct,
  updateProduct,
  getProducts,
  getProductID,
  queryProducts,
  deleteProduct,
  store,
  getStore,
  createDiscount,
  getDiscounts,
  deleteDiscount,
  createDelivery,
  updateDelivery,
  getDelivery,
  deleteDelivery,
  createReview,
  getReviews
}
