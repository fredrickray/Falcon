const Joi = require('joi');
const {
  Conflict,
  InvalidInput,
  BadRequest,
} = require('../middlewares/errorHandler');

// const registerSchema = Joi.object({
//   fname: Joi.string().required(),
//   lname: Joi.string().required(),
//   username: Joi.string().required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string().required(),
//   password: Joi.string()
//     .pattern(
//       new RegExp(
//         '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$'
//       )
//     )
//     .min(8)
//     .required(),
//   // .messages({
//   //   'string.pattern.base':
//   //     'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
//   //   'string.min': 'Password must be at least {#limit} characters long.',
//   //   'any.required': 'Password is required.',
//   // })
//   authType: Joi.string(),
// });

const registerSchema = Joi.object({
  fname: Joi.string().required().messages({
    'any.required': 'First Name field cannot be empty.',
  }),
  lname: Joi.string().required().messages({
    'any.required': 'Last Name field cannot be empty.',
  }),
  username: Joi.string().required().messages({
    'any.required': 'Username field cannot be empty.',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email Address cannot be empty.',
    'string.email': 'Invalid email address format.',
  }),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/)
    .messages({
      'string.pattern.base':
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.',
      'string.min': 'Password must be at least {#limit} characters long.',
      'any.required': 'Password is required.',
    }),
  phone: Joi.string()
    .pattern(/^\d{11}$/)
    .messages({
      'string.pattern.base': 'Phone number must be 11 characters long.',
    }),
  authType: Joi.string(),
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
    throw new BadRequest('Invalid Email or verification code');
  }

  next();
};

module.exports = { registerValidator, loginValidator, emailValidator };
