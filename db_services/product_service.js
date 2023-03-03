const knex = require("../data/knex");
const uuid4 = require("uuid4");
const { removeForeignKeyChecks, addForeignKeyChecks } = require("./helper_functions_service");
const constants = require('../controllers/product/constant');

const insertIntoProduct = (object) => {
    object.product_id = uuid4();
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

const selectProducts = (filters = {}) => {
    return knex
        .select('pr.product_id', 'pr.section_id', 'pr.quantity', 'pr.name as product_name', 'ca.name as category_name', 'se.name as section_name', 'wr.name as warehouse_name')
        .where(filters)
        .from('products AS pr')
        .leftJoin('categories AS ca', 'ca.category_id', 'pr.category_id')
        .leftJoin('sections AS se', 'se.section_id', 'pr.section_id')
        .leftJoin('warehouses AS wr', 'wr.warehouse_id', 'se.warehouse_id')
        .then((res) => {
            return res
        })
        .catch((error) => {
            throw error;
        });
};

const updateProduct = async (searchObject, object) => {
    await removeForeignKeyChecks();
    return knex(constants.name)
        .returning("*")
        .where(searchObject)
        .update(object)
        .then(async () => {
            await addForeignKeyChecks();
            return true;
        })
        .catch((error) => {
            throw error;
        });
};

module.exports = {
    insertIntoProduct,
    selectProducts,
    updateProduct
}