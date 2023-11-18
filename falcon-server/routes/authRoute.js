const express = require('express');

const {
  register,
  login,
  verifyEmail,
  update,
  passwordReset,
} = require('../controllers/authControl');

const router = express.Router();

router.post('/register', register);

router.post('/verify', verifyEmail);

router.post('/login', login);

router.put('/update', update);

router.post('/password_reset', passwordReset);

module.exports = router;
