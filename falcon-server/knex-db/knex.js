require("dotenv").config()
// requiring knex and connecting to the database
// const knex = require ('knex') ({
//     client: process.env.CLIENT,
//     connection: {
//       host: process.env.HOST,
//       port: process.env.DB_PORTS,
//       user: process.env.USER,
//       password: process.env.PASSWORD,
//       database: process.env.DATABASE,
//     },
//   });
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
// console.log(process.env.CLIENT)
  module.exports = knex;