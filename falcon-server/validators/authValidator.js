const Joi = require('joi');
const {
  Conflict,
  InvalidInput,
  BadRequest,
} = require('../middlewares/errorHandler');

const registerSchema = Joi.object({
  fname: Joi.string().required(),
  lname: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
  authType: Joi.string().required(),
});

const registerValidator = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    throw new InvalidInput(errorMessages);
  }

  next();
};

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginValidator = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    throw new InvalidInput(errorMessages);
  }

  next();
};

const emailSchema = Joi.object({
  email: Joi.string().email().required(),
  verificationCode: Joi.string().length(6).required(),
});

const emailValidator = (req, res, next) => {
  const { error } = emailSchema.validate(req.body);

  if (error) {
    // const errorMessages = error.details.map((detail) => detail.message);
    // throw new InvalidInput(errorMessages);
    throw new BadRequest('Invalid Email or verification code');
  }

  next();
};

module.exports = { registerValidator, loginValidator, emailValidator };
