const knex = require("../data/knex");
const uuid4 = require("uuid4");
const constants = require('../controllers/categories/constant');

const insertIntoCategory = (object) => {
    object.category_id = uuid4();
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

module.exports = {
    insertIntoCategory,
}