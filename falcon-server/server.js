const express = require('express');

const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const {
  authR,
  adminR,
  storeR,
  customerRoute,
  payRoute,
  openaiR,
  OauthRoute,
} = require('./routes/index');
const { errorHandler, routeNotFound } = require('./middlewares/errorHandler');
const createTables = require('./knex-db/createTables');

class App {
  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.routes();
    this.handleErrors();
    this.connectToDatabase();
  }

  initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(
      cors({
        origin: [
          'https://falcon-app.vercel.app',
          'https://falcon-admin.vercel.app',
        ],
        methods: ['GET', 'POST', 'UPDATE', 'DELETE', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['X-Requested-With', 'Content-Type'],
      })
    );

    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      session({
        secret: 'your_session_secret',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true },
      })
    );
    this.app.disable('x-powered-by');
  }

  routes() {
    this.app.use('/auth', authR);
    this.app.use('/admin', adminR);
    this.app.use('/store', storeR);
    this.app.use('/customer', customerRoute);
    this.app.use('/payment', payRoute);
    this.app.use('/openai', openaiR);
    this.app.use('/oauth', OauthRoute);
  }

  handleErrors() {
    this.app.use(errorHandler);
    this.app.use(routeNotFound);
  }

  async connectToDatabase() {
    await createTables();
  }

  start(port) {
    this.app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}

module.exports = App;
