const handleErrors = require("../../utilities/handle_errors");
const productService = require('../../db_services/product_service');
const sectionService = require('../../db_services/section_service');
const { joiModelValidation } = require("../../utilities/helper");
const productModel = require('../../models/product_model');


const createProduct = async (req, res) => {
    try {
        const validatedModel = joiModelValidation(req, res, 'insertProduct', productModel);
        if(validatedModel) {
            let currentSection = await sectionService.selectSections({section_id: req.body.section_id});
            if(Array.isArray(currentSection) && currentSection.length === 1) {
                let currentSectionCapacity = currentSection[0].capacity;
                if(currentSectionCapacity < req.body.quantity) {
                    return res.status(200).send({
                        success: false , 
                        message: `product quantity is more than section capacity`,
                        data: {}
                    });                
                }
                let latestSectionCapacity = currentSectionCapacity - req.body.quantity;
                let product = await productService.insertIntoProduct(req.body);
                if(product) {   
                    //update the section capacity and warehouse capacity as per the product quantity
                    await sectionService.updateSection({section_id: req.body.section_id}, {capacity: latestSectionCapacity})
                    return res.status(200).send({
                        success: true , 
                        message: 'product added successfully!',
                        data: product
                    });
                }
            }
        }
    } catch (error) {
        return handleErrors(error, res);
    }
};

module.exports = {
    createProduct
}