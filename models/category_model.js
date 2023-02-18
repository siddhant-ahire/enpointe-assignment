const Joi = require("joi");

const insertCategory = Joi.object({
    name: Joi.string().required(),
});

module.exports = {
    insertCategory,
}