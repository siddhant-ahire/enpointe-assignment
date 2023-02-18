const Joi = require("joi");

const insertProduct = Joi.object({
    name: Joi.string().required(),
    quantity: Joi.number().required(),
    category_id: Joi.string().uuid().required(), 
    section_id: Joi.string().uuid().required(), 
    adding_type: Joi.number().required()
});

module.exports = {
    insertProduct,
}