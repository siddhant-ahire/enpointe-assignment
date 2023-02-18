const knex = require("../data/knex");
const uuid4 = require("uuid4");
const constants = require('../controllers/warehouse/constants');

const insertIntoWarehouse = (object) => {
    object.warehouse_id = uuid4();
    return knex(constants.name)
        .returning("*")
        .insert(object)
        .then(() => {
            return true
        })
        .catch((error) => {
            throw error;
        });
};

const selectWarehouses = (filters = {}) => {
    return knex(constants.name)
        .select('*')
        .where(filters)
        .then((res) => {
            return res
        })
        .catch((error) => {
            throw error;
        });
};

const updateWarehouse = (searchObject , object) => {
    return knex(constants.name)
        .returning("*")
        .where(searchObject)
        .update(object)
        .then(() => {
            return true;
        })
        .catch((error) => {
            throw error;
        });
};

module.exports = {
    insertIntoWarehouse,
    selectWarehouses,
    updateWarehouse
}