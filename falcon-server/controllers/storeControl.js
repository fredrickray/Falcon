// const catchAsync = require ('./../utls/catchAsync');
// const AppError = require("./../utls/appError")
const knex = require ('knex') ({
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'Falcon',
  },
});

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    console.log (authHeader);
    const token = authHeader.split (' ')[1];

    jwt.verify (token, 'this is the hardest secret to decode', (err, user) => {
      if (err) {
        return res.status (403).json ('Token is not valid');
      }
      req.user = user;
      next ();
    });
  } else {
    res.status (401).send ('You are not authenticated');
  }
};

//creating store for a merchant
exports.createStore = async (req, res) => {
  const {name, store_link, email, logo_link} = req.body;
  if (name == '') {
    res.send ('Name field must not be empty');
  } else if (store_link == '') {
    res.send ('Store Link field must not be empty');
  } else if (logo_link == '') {
    res.send ('Please select a logo');
  } else {
    try {
      let store = await knex ('Store').insert ({
        name: name,
        store_link: store_link,
        email: email,
        logo_link: logo_link,
      });
      res.send ({
        message: 'Store created successfully',
        status: 'Success',
        store,
      });
    } catch (error) {
      res.send ({message: 'Failed to create store', status: 'Error', error});
      console.log (error);
    }
  }
};

//creating products
exports.createProduct = async (req, res) => {
  const {name, description, price, email, weight, quantity, image,  style, size, colour} = req.body;
  if (name == '') {
    res.send ({message: 'Name field must not be empty'});
  } else if (description == '') {
    res.send ({message: 'Description field must not be empty'});
  } else if (price == '') {
    res.send ({message: 'Price field must not be empty'});
  } else if (weight == '') {
    res.send ({message: 'Weight field must not be empty'});
  }
  else if (quantity == '') {
    res.send ({message: 'Quantity field must not be empty'});
  } else if(!image || image == "") {
    res.send({message: "Please select an image"})
  }
   else {
    knex ('Products')
      .insert ({
        name,
        price,
        email,
        quantity,
        description,
        weight,
        image,
        style,
        colour,
        size
      })
      .then (response => {
        // console.log (response);
        res
          .status (201)
          .json ({message: 'Product created succesfully', status: 'Success', response});
        console.log ({message: "Product created succesfully"}, response);
      })
      .catch (err => {
        console.log ({message: "Server error"}, err);
        res
          .status (500)
          .json ({message: 'There was a server error', status: 'Server error', err});
      });
  }
};

// getting all products of a merchants
exports.getProducts = async(req, res) => {
  let email = req.body.email
  try{
    let response = await knex("Products").where({email: email})
    if(response == "") {
      console.log("Email not found")
      res.status(404).json({message: "Email not found"})
    }
    else{
      let data = response
      let data2 = JSON.parse(JSON.stringify(data));
      console.log({message: "Products were retrived succesfully", data2})
      res.status(200).json({status: "success", message: "Products were retrieved successfully", data2})
    }
  } 
  catch (error){
    // console.log(error)
    res.status(500).send({status: "Server Error", message: "There was an error in the server"})
  }
}

// getting the store of a merchant
exports.getStore = async (req, res) => {
  const name = req.params.store;

  try{
    let response = await knex("Products").where({store: name})
    console.log(response)
    // res.send(response)
    if(response == "") {
      res.status(404).json({status: "Not found", message: "There's no Store with this name, try again"})
      console.log("Store not found")
    }
    else{
      res.status(200).json({status: "Success", message: "Retrieved Store for user", response})
      console.log(response)
    }
  } 
  catch(err) {
    console.log(err)
    res.status(500).json({status: "Error", message: err})
  }
};

exports.queryProducts = async(req, res) => {
  let { q }= req.query
  const keys = ["fname", "lname", "email", "username", "phone"]

  
  try{
    const search = (data) => {
      return data.filter((item) => 
        keys.some((key) => item[key].toLowerCase().includes(q))
      )
    }
    let response = await knex ('Merchants')
    console.log(q)
    res.json(search(response))
  } 
  catch (error){
    console.log(error)
    res.status(500).send({status: "Error", message: "There was problem retriving data"})
  }
}

// To get a single product for a merchant
exports.getProductID = async (req, res) => {
  const id = req.params.id;

    try {
      let response = await knex ('Products').where ({id: id});
      // console.log (response);
      // res.send(response)
      if (response == '') {
        res.status (404).json ({
          status: 'Not found',
          message: "There's no product with this id",
        });
        console.log ("There's no product with this id");
      } else {
        res.status (200).json ({
          status: 'Success',
          message: 'Retrieved product successfully',
          response,
        });
        console.log (response);
      }
    } catch (err) {
      console.log (err);
      res.status (500).json ({status: ' Sever Error', message: "Internal server error", err});
    }
};

//deleting a product
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.send ({message: "Thers's no id"});
  } else {
    try {
      let response = knex ('Goods').where ({id}).delete ();
      console.log (response);
      if (response == '') {
        res
          .status (404)
          .json ({
            status: 'Not found',
            message: "There's no id for this product",
          });
      } else {
        res
          .status (200)
          .json ({
            status: 'Success',
            message: 'Product deleted succesfully',
            response,
          });
        console.log (response);
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({status: "Error", message: error})
    }
  }
};

//delivery information
exports.createDelivery = async (req, res) => {
  const {name, location, fee, email} = req.body;

  knex ('delivery')
    .insert ({name: name, location: location, fee: fee, email: email})
    .then (response => {
      console.log (response);
      res.status (200).json ({
        message: 'Delivery information Created',
        status: 'success',
        response,
      });
    });
};
