const handleErrors = require("../../utilities/handle_errors");
const userService = require('../../db_services/user_service');
const { joiModelValidation, bcryptCompare, cryptHash, signToken } = require("../../utilities/helper");
const userModel = require('../../models/user_model');

const register = async (req, res) => {
    try {
        const validatedModel = joiModelValidation(req, res, 'insertUser', userModel);
        if (validatedModel === true) {
            req.body.password = await cryptHash(req.body.password);
            let user = await userService.insertIntoUser(req.body);
            if (user) {
                return res.status(200).send({
                    success: true,
                    message: 'user added successfully!',
                    data: user
                });
            }
        }

    } catch (error) {
        return handleErrors(error, res);
    }
};

const login = async (req, res) => {
    try {
        const validatedModel = joiModelValidation(req, res, 'loginUser', userModel);
        if (validatedModel === true) {
            const users = await userService.selectUsers({ username: req.body.username });
            if (!users || users.length === 0 ) {
                return res.status(404).send({
                    message: "User does not exist!",
                    success: false,
                    data: {}
                });
            }
            let user = {...users[0]};
            match = await bcryptCompare(req.body.password, user.password);
            if (!match) {
                return res.status(401).send({
                    message: "Invalid email or password",
                    success: false,
                    data: ""
                });
            } else {
                delete user.password;
                delete user.created_at;
                delete user.updated_at;
                return res.status(200).send({
                    message: "signin success",
                    success: true,
                    data: {
                        token: signToken(user),
                        ...user
                    }
                });
            }
        }
    } catch (error) {
        return handleErrors(error, res);
    }
};

module.exports = {
    register,
    login
}