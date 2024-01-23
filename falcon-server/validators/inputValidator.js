const Joi = require("joi");
const {
    InvalidInput,
    BadRequest
} = require("../middlewares/errorHandler");


const storeSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `Name field cannot be empty`,
    }),
    email: Joi.string().email().required().messages({
        "any.required": `Email address is required.`,
        "string.email": `Invalid email address format.`
    }),
    link: Joi.string().required().messages({
        'any.required': 'Link field cannot be empty'
    }),
    logo: Joi.string()
});

const storeValidator = (req, res, next) => {
    const { error } = storeSchema.validate(req.body)

    if(error) {
        const errorMessage = error.details.map((detail) => detail.message);
        throw new InvalidInput(errorMessage)
    }
    next()
}

const collectionSchema = Joi.object({
    productName: Joi.string().required()
})

const productSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Name field cannot be empty'
    }),
    price: Joi.string().required().messages({
        'any.required': 'Price field cannot be empty'
    }),
    compare_price: Joi.string().required().messages({
        'any.required': 'Compare price field cannot be empty'
    }),
    quantity: Joi.string().required().messages({
        'any.required': 'Qunatity field cannot be empty'
    }),
    weight: Joi.string().required().messages({
        'any.required': 'Weight field cannot be empty'
    }),
    description: Joi.string().required().messages({
        'any.required': 'Description field cannot be empty'
    }),
    image: Joi.string().required().messages({
        'any.required': 'Image field cannot be empty'
    }),

    style: Joi.string().optional(),
    colour: Joi.string().optional(),
    size: Joi.string().optional(),
    collection: Joi.string().optional(),

    store: Joi.string().required().messages({
        'any.required': 'Store is required'
    }),
    email: Joi.string().required().messages({
        'any.required': 'Email is required'
    })
});

const productValidator = (req, res, next) => {
    const { error } = productSchema.validate(req.body);

    if(error) {
        const errorMessages = error.details.map((detail) => detail.message);
        throw new InvalidInput(errorMessages);
    };
};

module.exports = { storeValidator, productValidator };