const request = require('supertest');
const app = require("./app"); // replace with the path to your Express app
const knex = require('./knex-db/knex'); // replace with the path to your Knex instance
const bcrypt = require('bcryptjs');
const { createToken } = require('./utls/createToken'); // replace with the path to your createToken utility function

describe('POST /auth/login', () => {
  beforeEach(async () => {
    // Run migrations and seed data for the test database
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterEach(async () => {
    // Rollback the migrations and clear the test database
    await knex.migrate.rollback();
    await knex.destroy();
  });

  test('should return 200 and a token when the login credentials are valid', async () => {
    const user = {
      email: 'test@example.com',
      password: 'password123',
    };

    const hashedPassword = await bcrypt.hash(user.password, 10);
    await knex('Merchants').insert({
      email: user.email,
      password: hashedPassword,
    });

    const response = await request(app)
      .post('/login')
      .send(user)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('should return 401 when the email is not registered', async () => {
    const user = {
      email: 'nonexistent@example.com',
      password: 'password123',
    };

    const response = await request(app)
      .post('/login')
      .send(user)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Wrong email or passsword, try again');
  });

  test('should return 401 when the password is incorrect', async () => {
    const user = {
      email: 'test@example.com',
      password: 'wrongpassword',
    };

    const hashedPassword = await bcrypt.hash('password123', 10);
    await knex('Merchants').insert({
      email: user.email,
      password: hashedPassword,
    });

    const response = await request(app)
      .post('/login')
      .send(user)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Wrong email or password, try again');
  });

  test('should return 500 when the server encounters an error', async () => {
    // Mock the `knex` instance to throw an error when querying the database
    knex.mockImplementation(() => {
      return {
        select: () => {
          throw new Error('Database error');
        },
      };
    });

    const user = {
      email: 'test@example.com',
      password: 'password123',
    };

    const response = await request(app)
      .post('/login')
      .send(user)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});
