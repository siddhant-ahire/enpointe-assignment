const handleErrors = require("../../utilities/handle_errors");
const sectionService = require('../../db_services/section_service');
const { joiModelValidation } = require("../../utilities/helper");
const warehouseService = require('../../db_services/warehouse_service');
const sectionModel = require('../../models/section_model');


const createSection = async (req, res) => {
    try {
        const validatedModel = joiModelValidation(req, res, 'insertSection', sectionModel)
        if(validatedModel === true) {
            let warehouse_id = req.body.warehouse_id;
            let currentWarehouse = await warehouseService.selectWarehouses({warehouse_id});
            if(Array.isArray(currentWarehouse) && currentWarehouse.length === 1) {
                let currentWarehouseCapacity = currentWarehouse[0].capacity;
                if(req.body.is_whole_section) {
                    currentWarehouseCapacity = currentWarehouse[0].total_capacity;
                    await sectionService.deleteSection({warehouse_id: req.body.warehouse_id});
                    req.body.capacity = currentWarehouseCapacity - 1
                }
                if(currentWarehouseCapacity < req.body.capacity) {
                    return res.status(400).send({
                        success: false , 
                        message: `section capacity is more than warehouse capacity`,
                        data: {}
                    });                
                }
                if(req.body.is_whole_section) req.body.capacity = req.body.capacity + 1;
                delete req.body.is_whole_section;
                let section = await sectionService.insertIntoSection(req.body);
                //update the warehouse capacity as per the section quantity
                let latestWarehouseCapacity = currentWarehouseCapacity - req.body.capacity;
                await warehouseService.updateWarehouse({warehouse_id}, {capacity: latestWarehouseCapacity});
                if(section) {   
                    return res.status(200).send({
                        success: true , 
                        message: 'section added successfully!',
                        data: section
                    });
                }
            }
        }

    } catch (error) {
        return handleErrors(error, res);
    }
};

const getSections = async (req, res) => {
    try {
        let section = await sectionService.selectSections()
        if(section) {   
            return res.status(200).send({
                success: true , 
                message: 'section fetched successfully!',
                data: section
            });
        }
    } catch (error) {
        return handleErrors(error, res);
    }
};

module.exports = {
    createSection,
    getSections
}