const Joi = require("joi");

const insertUser = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

const loginUser = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

module.exports = {
    insertUser,
    loginUser
}