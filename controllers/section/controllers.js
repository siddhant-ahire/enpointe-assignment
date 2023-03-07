const handleErrors = require("../../utilities/handle_errors");
const { joiModelValidation } = require("../../utilities/helper");
const sectionModel = require('../../models/section_model');
const { PrismaClient } = require('@prisma/client');
const uuid4 = require("uuid4");
const prisma = new PrismaClient();


const createSection = async (req, res) => {
    try {
        const validatedModel = joiModelValidation(req, res, 'insertSection', sectionModel)
        if(validatedModel === true) {
            let warehouse_id = req.body.warehouse_id;
            let currentWarehouse = await prisma.warehouses.findUnique({where: {warehouse_id}});
            console.log(currentWarehouse)
            if(currentWarehouse.warehouse_id) {
                let currentWarehouseCapacity = currentWarehouse.capacity;
                if(req.body.is_whole_section) {
                    currentWarehouseCapacity = currentWarehouse.total_capacity;
                    await prisma.sections.deleteMany({where: {warehouse_id: req.body.warehouse_id}});
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
                req.body.section_id = uuid4();
                let section = await prisma.sections.create({data: req.body});
                // //update the warehouse capacity as per the section quantity
                let latestWarehouseCapacity = currentWarehouseCapacity - req.body.capacity;
                await prisma.warehouses.update({where: {warehouse_id}, data: {capacity: latestWarehouseCapacity}});
                if(section) {   
                    return res.status(200).send({
                        success: true , 
                        message: 'section added successfully!',
                        data: section
                    });
                }
            } else {
                return res.status(404).send({
                    success: false , 
                    message: `warehouse not found`,
                    data: {}
                }); 
            }
        }

    } catch (error) {
        return handleErrors(error, res);
    }
};

const getSections = async (req, res) => {
    try {
        let section = await prisma.sections.findMany({
            include: {
                warehouses: true
            }
        })
        if(section) {   
            section = section.map(sec => {
                return {
                    ...sec,
                    warehouse_name: sec.warehouses.name,
                    warehouses: undefined
                }
            })
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