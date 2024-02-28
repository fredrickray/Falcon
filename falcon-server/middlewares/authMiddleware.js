const jwt = require('jsonwebtoken');
const knex = require('../knex-db/knex');

// MERN Authentication -- Net Ninja
const requireAuth = async (req, res, next) => {
  // verifying authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    req.user = await knex('Merchants').where({ id });
    // console.log(user);
    next();
  } catch (error) {
    // console.log(error)
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = requireAuth;
