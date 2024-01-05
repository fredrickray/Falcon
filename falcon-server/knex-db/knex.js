require('dotenv').config();
// requiring knex and connecting to the database

// const knex = require('knex')({
//   client: process.env.DB_CLIENT,
//   connection: {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//   },
// });
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
module.exports = knex;
