require('dotenv').config();
const App = require('./server');

const server = new App();

server.start(process.env.PORT || 3000);
