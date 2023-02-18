const handleErrors = require("../../utilities/handle_errors");
const warehouseService = require('../../db_services/warehouse_service');
const { joiModelValidation } = require("../../utilities/helper");
const warehouseModel = require('../../models/warehouse_model');

const createWarehouse = async (req, res) => {
    try {
        const validatedModel = joiModelValidation(req, res, 'insertWarehouse', warehouseModel)
        if (validatedModel === true) {
            req.body.total_capacity = req.body.capacity;
            let warehouse = await warehouseService.insertIntoWarehouse(req.body)
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
        let warehouseList = await warehouseService.selectWarehouses()
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