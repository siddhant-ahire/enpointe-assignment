const handleErrors = require("../../utilities/handle_errors");
const { joiModelValidation } = require("../../utilities/helper");
const warehouseModel = require('../../models/warehouse_model');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const uuid4 = require("uuid4");

const createWarehouse = async (req, res) => {
    try {
        const validatedModel = joiModelValidation(req, res, 'insertWarehouse', warehouseModel)
        if (validatedModel === true) {
            req.body.total_capacity = req.body.capacity;
            req.body.warehouse_id = uuid4();
            let warehouse = await prisma.Warehouses.create({ data: req.body });
            if (warehouse) {
                return res.status(200).send({
                    success: true,
                    message: 'warehouse added successfully!',
                    data: warehouse
                });
            }
        }
    } catch (error) {
        return handleErrors(error, res);
    }
};

const getWarehouses = async (req, res) => {
    try {
        let warehouseList = await prisma.Warehouses.findMany()
        if (warehouseList) {
            return res.status(200).send({
                success: true,
                message: 'warehouse fetched successfully!',
                data: warehouseList
            });
        }
    } catch (error) {
        return handleErrors(error, res);
    }
};

module.exports = {
    createWarehouse,
    getWarehouses
}