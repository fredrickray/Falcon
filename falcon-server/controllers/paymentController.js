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



exports.savePayment = async (req, res) => {
    let { amount, currency, tx_ref, transaction_id, email, firstname, lastname, customer_email, status }=req.body;
  
    try {
      const response = await knex("Transactions").insert({ amount, currency, tx_ref, transaction_id, customer_email, email, firstname, lastname, status }).where({email})
      console.log(response)
      res.status(201).send({message: "Transaction completed succesfully", response})
    } 
    catch (error) {
      console.log(error.message)
      res.status(500).send({ message: "Internal server error", err: error.message })
    }
}

exports.getPayments = async (req, res) => {
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


exports.deletePayment = async (req, res) => {
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


exports.getAllPayments = async(req, res) => {
    try {
        const response = knex.select().from("Transactions")
        console.log(response)
        res.send(response)
    } 
    catch (error) {
        console.log(error)
        res.status(500).send({message: "Internal server error", err: error.message})
    }
}