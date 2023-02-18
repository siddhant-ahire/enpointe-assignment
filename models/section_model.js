const Joi = require("joi");

const insertSection = Joi.object({
    name: Joi.string().required(),
    capacity: Joi.number().default(0),
    is_whole_section: Joi.boolean().required(),
    warehouse_id: Joi.string().uuid().required() 
});

module.exports = {
    insertSection,
}