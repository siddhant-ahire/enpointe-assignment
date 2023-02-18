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

const updateSection = async (searchObject, object) => {
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
    updateSection
}