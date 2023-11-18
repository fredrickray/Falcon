const authR = require('./authRoute');
const adminR = require('./adminRoute');
const storeR = require('./storeRoute');
const customerRoute = require('./customerRoute');
const payRoute = require('./paymentRoute');
const openaiR = require('./openaiRoute');
const OauthRoute = require('./googleRoute');

module.exports = {
  authR,
  adminR,
  storeR,
  customerRoute,
  payRoute,
  openaiR,
  OauthRoute,
};
