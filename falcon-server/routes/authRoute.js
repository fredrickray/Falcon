const express = require('express');
const passport = require('passport');
require('../middlewares/fbAuth');

const {
  register,
  login,
  verifyEmail,
  passwordReset,
  forgotPassword,
  updateUser,
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

router.post('/password_reset', passwordReset);

router.put('/profile', updateUser);

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
);

router.post('/forgot-password', forgotPassword);

module.exports = router;
