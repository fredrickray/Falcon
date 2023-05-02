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
    res.send ('Name field must not be empty');
  } else if (description == '') {
    res.send ('Description field must not be empty');
  } else if (price == '') {
    res.send ('Price field must not be empty');
  } else if (weight == '') {
    res.send ('Weight field must not be empty');
  }
  else if (quantity == '') {
    res.send ('Quantity field must not be empty');
  } else {
    knex ('Goods')
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
        console.log (response);
        res
          .status (200)
          .json ({message: 'Store created', status: 'Success', response});
        console.log (response);
      })
      .catch (err => {
        console.log (err);
        res
          .status (400)
          .json ({message: 'Failed to create product', status: 'failed', err});
      });
  }
};

// getting history of all product for a merchant
exports.getAllProducts = async (req, res) => {
  const name = req.params.store;
    
  if (!name) {
    res.send ({message: "There's no name"});
  } else {
    try {
      let response = await knex ('Goods').where ({store: name});
      console.log (response);
      // res.send(response)
      if (response == '') {
        res.status (404).json ({
          status: 'Not found',
          message: "There's no Store with this name, try again",
        });
        console.log ('Store not found');
      } else {
        res.status (200).json ({
          status: 'Success',
          message: 'Retrieved Store for user',
          response,
        });
        console.log (response);
      }
    } catch (err) {
      console.log (err);
      res.status (400).json ({status: 'Error', message: err});
    }
  }
  // res.send("You requested to see the store with the name of " + req.params.store)
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

  if (!id) {
    res.send ({message: "There's no id for this product"});
  } else {
    try {
      let response = await knex ('Goods').where ({id: id});
      console.log (response);
      // res.send(response)
      if (response == '') {
        res.status (404).json ({
          status: 'Not found',
          message: "There's no product with this id",
        });
        console.log ('Product not found');
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
      res.status (400).json ({status: 'Error', message: err});
    }
  }
  // res.send("You requested to see the product with the id of " + req.params.id)
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
