const handleErrors = require("../../utilities/handle_errors");
const { joiModelValidation } = require("../../utilities/helper");
const productModel = require('../../models/product_model');
const { PrismaClient } = require('@prisma/client');
const uuid4 = require("uuid4");
const prisma = new PrismaClient();


const createProduct = async (req, res) => {
    try {
        const validatedModel = joiModelValidation(req, res, 'insertProduct', productModel);
        if (validatedModel === true) {
            let currentSection = await prisma.sections.findUnique({where: { section_id: req.body.section_id }});
            console.log(currentSection);
            if (currentSection.section_id) {
                let currentSectionCapacity = currentSection.capacity;
                if (currentSectionCapacity < req.body.quantity) {
                    return res.status(200).send({
                        success: false,
                        message: `product quantity is more than section capacity`,
                        data: {}
                    });
                }
                let latestSectionCapacity = currentSectionCapacity - req.body.quantity;
                req.body.product_id = uuid4()
                let product = await prisma.products.create({data: req.body});
                if (product) {
                    //update the section capacity as per the product quantity
                    await prisma.sections.update({where: { section_id: req.body.section_id }, data: { capacity: latestSectionCapacity }})
                    return res.status(200).send({
                        success: true,
                        message: 'product added successfully!',
                        data: product
                    });
                }
            } else {
                return res.status(200).send({
                    success: false,
                    message: `section not found`,
                    data: {}
                });
            }
        }
    } catch (error) {
        return handleErrors(error, res);
    }
};

const getProducts = async (req, res) => {
    try {
        let products = await prisma.products.findMany({
            include: {
                categories: true
            }
        });
        if (products) {
            return res.status(200).send({
                success: true,
                message: 'products fetched successfully!',
                data: products
            });
        }
    } catch (error) {
        return handleErrors(error, res);
    }
}

const moveProductToOtherSection = async (req, res) => {
    try {
        let product = await prisma.products.findUnique({where: { product_id: req.body.product_id}});
        if(product) {
            console.log('working', product)
            let oldSection = await prisma.sections.findUnique({where: { section_id: product.section_id}});
            let newSection = await prisma.sections.findUnique({where: { section_id: req.body.new_section_id}});
            if(newSection){
                let oldSectionCapacity = oldSection.capacity;
                let newSectionCapacity = newSection.capacity;
                let productQuantity = product.quantity;
                if(newSectionCapacity >= productQuantity) {
                    let updateOldSection = await prisma.sections.update({where: { section_id: oldSection.section_id }, data: { capacity: oldSectionCapacity - productQuantity }});
                    let updateNewSection = await prisma.sections.update({where: { section_id: newSection.section_id }, data: { capacity: newSectionCapacity + productQuantity }});
                    let updateProduct = await prisma.products.update({where: { product_id: req.body.product_id }, data: { section_id: req.body.new_section_id }});
                    if (updateProduct && updateOldSection && updateNewSection) {
                        return res.status(200).send({
                            success: true,
                            message: 'product moved successfully',
                            data: {}
                        });
                    }
                }
            }
        } else {
            return res.status(404).send({
                success: false,
                message: `product not found`,
                data: {}
            });
        }
    } catch (error) {
        return handleErrors(error, res);
    }
}

module.exports = {
    createProduct,
    getProducts,
    moveProductToOtherSection
}