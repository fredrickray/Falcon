const express = require('express');

const {
  register,
  login,
  verifyEmail,
  update,
  passwordReset,
} = require('../controllers/authControl');
const {
  registerValidator,
  emailValidator,
  loginValidator,
} = require('../validators/authValidator');

const router = express.Router();

router.post('/register', registerValidator, register);

router.post('/verify', emailValidator, verifyEmail);

router.post('/login', loginValidator, login);

router.put('/update', update);

router.post('/password_reset', passwordReset);

module.exports = router;
