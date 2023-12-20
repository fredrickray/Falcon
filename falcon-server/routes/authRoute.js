const express = require('express');

const passport = require('passport');
require('../middlewares/fbAuth');

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

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
);

module.exports = router;
