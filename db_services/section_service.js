const knex = require("../data/knex");
const uuid4 = require("uuid4");
const constants = require('../controllers/section/constant');
const { removeForeignKeyChecks, addForeignKeyChecks } = require("./helper_functions_service");

const insertIntoSection = (object) => {
    object.section_id = uuid4();
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

const selectSections = (filters = {}) => {
    return knex
        .select('se.*', 'wr.name as warehouse_name')
        .from('sections AS se')
        .leftJoin('warehouses AS wr', 'wr.warehouse_id', 'se.warehouse_id')
        .where({is_deleted: false})
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

const deleteSection = (filter) => {
    return knex(constants.name)
        .returning("*")
        .where(filter)
        .update({is_deleted: true})
        .then((res) => {
            return true;
        })
        .catch((error) => {
            throw error;
        });
};

module.exports = {
    insertIntoSection,
    selectSections,
    updateSection,
    deleteSection
}