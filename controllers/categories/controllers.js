const handleErrors = require("../../utilities/handle_errors");
const { joiModelValidation } = require("../../utilities/helper");
const categoryModel = require('../../models/category_model');
const { PrismaClient } = require('@prisma/client');
const uuid4 = require("uuid4");
const prisma = new PrismaClient();

const createCategory = async (req, res) => {
    try {
        const validatedModel = joiModelValidation(req, res, 'insertCategory', categoryModel)
        if (validatedModel === true) {
            req.body.category_id = uuid4()
            let category = await prisma.categories.create({data:req.body})
            if (category) {
                return res.status(200).send({
                    success: true,
                    message: 'category added successfully!',
                    data: category
                });
            }
        }

    } catch (error) {
        return handleErrors(error, res);
    }
};

const getCategories = async (req, res) => {
    try {
        let category = await prisma.categories.findMany();
        if (category) {
            return res.status(200).send({
                success: true,
                message: 'category fetched successfully!',
                data: category
            });
        }
    } catch (error) {
        return handleErrors(error, res);
    }
};

module.exports = {
    createCategory,
    getCategories
}