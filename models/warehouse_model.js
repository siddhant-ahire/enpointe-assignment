const Joi = require("joi");

const insertWarehouse = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required(),
    unique_code: Joi.number().required(),
    status: Joi.string().required(),
    capacity: Joi.number().required(),
});

module.exports = {
    insertWarehouse,
}