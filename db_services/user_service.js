const knex = require("../data/knex");
const uuid4 = require("uuid4");
const constants = require('../controllers/user/constant');

const insertIntoUser = (object) => {
    object.user_id = uuid4();
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

const selectUsers = (filters = {}) => {
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

module.exports = {
    insertIntoUser,
    selectUsers
}