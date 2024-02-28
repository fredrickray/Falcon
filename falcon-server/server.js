const express = require('express');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
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
    this.app.use(helmet());
    this.app.use(morgan('combined'));

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
    const sessionConfig = {
      secret: process.env.SESSION_SECRET || 'your_session_secret',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.NODE_ENV === 'production' },
    };

    this.app.use(session(sessionConfig));
    this.app.disable('x-powered-by');

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    });
    this.app.use(limiter);
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
    try {
      await createTables();
      console.log('Database connected and tables created');
    } catch (error) {
      console.error('Database connection error:', error);
    }
  }

  start(port) {
    this.app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}

module.exports = App;
