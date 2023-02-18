const handleErrors = require("../../utilities/handle_errors");
const userService = require('../../db_services/user_service');
const { joiModelValidation } = require("../../utilities/helper");
const userModel = require('../../models/user_model');


const createUser = async (req, res) => {
    try {
        const validatedModel = joiModelValidation(req, res, 'insertUser', userModel)
        if(validatedModel) {
            let user = await userService.insertIntoUser(req.body)
            if(user) {   
                return res.status(200).send({
                    success: true , 
                    message: 'user added successfully!',
                    data: user
                });
            }
        }

    } catch (error) {
        return handleErrors(error, res);
    }
};

module.exports = {
    createUser
}