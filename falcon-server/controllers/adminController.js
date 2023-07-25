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

// getting all stores for all merchants
exports.allStores = async(req, res) => {
    const id = req.body.id
  
    try{
      let data = await knex.select().from("Store")
  
      if(data) {
        console.log(data)
        res.send({message: "All stores were successfully retrieved", status: "Success", data})
      }
      else{
        res.send({messsage: "Stors were not retrieved", status: "Failed"})
      }
    }
    catch (err){
      console.log(err)
      res.send({message: "There was an error retrieving data", status: "Error"})
    }
}


  // retrieving a particular store by id
exports.getStoreID = async (req, res) => {
    let {name, id} = req.body;
  
    try {
      let response = await knex ('Store').where ({name, id});
      if (response) {
        console.log (response);
        res.status (200).json ({
          status: 'Success',
          message: 'The single store was retrieved successfully',
          response,
        });
      } else {
        res.json ({status: 'Failed', message: 'Something went wrong'});
      }
    } catch (error) {
      console.log (error);
      res.send ({status: 'Error', message: 'An error occured'});
    }
  };