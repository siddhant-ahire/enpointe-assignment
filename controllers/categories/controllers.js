const handleErrors = require("../../utilities/handle_errors");
const categoryService = require('../../db_services/category_service');
const { joiModelValidation } = require("../../utilities/helper");
const categoryModel = require('../../models/category_model');


const createCategory = async (req, res) => {
    try {
        const validatedModel = joiModelValidation(req, res, 'insertCategory', categoryModel)
        if(validatedModel) {
            let category = await categoryService.insertIntoCategory(req.body)
            if(category) {   
                return res.status(200).send({
                    success: true , 
                    message: 'category added successfully!',
                    data: category
                });
            }
        }

    } catch (error) {
        return handleErrors(error, res);
    }
};

module.exports = {
    createCategory
}