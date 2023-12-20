const knex = require('knex');
const config = require('./knexfile').development;

const db = knex(config);

async function tableExists(tableName) {
  return db.schema.hasTable(tableName);
}

async function createTableIfNotExists(tableName, tableDefinition) {
  if (!(await tableExists(tableName))) {
    await db.schema.createTable(tableName, tableDefinition);
    console.log(`Table ${tableName} created successfully`);
  } else {
    console.log(`Table ${tableName} already exists, skipping creation`);
  }
}

const createTables = async function () {
  try {
    await createTableIfNotExists('Merchants', function (table) {
      table.increments('id').primary(); // Assuming id is the primary key
      table.string('google_id');
      table.string('fname');
      table.string('lname');
      table.string('email').unique();
      table.string('phone');
      table.string('username');
      table.string('password');
      table.string('instagram');
      table.string('tiktok');
      table.string('twitter');
      table.string('authType');
      table.boolean('verified').defaultTo(false);
      table.string('token');
      // You can add more columns as needed

      table.timestamps(true, true); // Adds created_at and updated_at columns
    });

    await createTableIfNotExists('Products', function (table) {
      table.increments('id').primary(); // Assuming id is the primary key
      table.string('name');
      table.string('price');
      table.string('compare_price');
      table.string('quantity');
      table.string('description');
      table.string('weight');
      table.string('image');
      table.string('collection'); //or category
      table.string('style');
      table.string('colour');
      table.boolean('size');

      table.string('merchant_email').references('email').inTable('Merchants');
      table.string('store');

      table.timestamps(true, true); // Adds created_at and updated_at columns
    });

    await createTableIfNotExists('Transactions', function (table) {
      table.increments('id').primary(); // Assuming id is the primary key
      table.string('firstname');
      table.string('lastname');
      table.string('customer_email');
      table.string('amount');
      table.string('tx_ref');
      table.string('transaction_id');
      table.string('currency');
      table.string('status'); //or category
      table.string('merchant_email').references('email').inTable('Merchants');
      table.string('colour');
      table.boolean('size');

      table.timestamps(true, true); // Adds created_at and updated_at columns
    });

    await createTableIfNotExists('Store', function (table) {
      table.increments('id').primary(); // Assuming id is the primary key
      table.string('name');
      table.string('email').unique(); // foreign key to the Merchants(email) table
      table.string('link');
      table.string('logo');

      table.timestamps(true, true); // Adds created_at and updated_at columns
    });

    await createTableIfNotExists('Orders', function (table) {
      table.increments('id').primary();
      table.string('firstname');
      table.string('lastname');
      table.string('customer_email');
      table.string('amount');
      table.string('tx_ref');
      table.string('shipping_fee');
      table.string('discount');
      table.string('state');
      table.string('address');
      table.string('delivery_note');
      table.string('status');
      table.string('merchant_email').references('email').inTable('Merchants');

      table.timestamps(true, true); // Adds created_at and updated_at columns
    });

    await createTableIfNotExists('Order_detail', function (table) {
      table.increments('id').primary();
      table.string('product_id');
      table.string('name');
      table.string('image');
      table.string('price');
      table.string('quantity');
      table.string('tx_ref').references('tx_ref').inTable('Orders').index();

      table.timestamps(true, true); // Adds created_at and updated_at columns
    });

    await db.schema;
  } catch (error) {
    console.error('Error creating tables', error);
  } finally {
    await db.destroy();
  }
};

module.exports = createTables;
