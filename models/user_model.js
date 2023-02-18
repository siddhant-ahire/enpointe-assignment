const Joi = require("joi");

const insertUser = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

module.exports = {
    insertUser,
}