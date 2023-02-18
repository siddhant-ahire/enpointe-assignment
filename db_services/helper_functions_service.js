const knex = require("../data/knex");

function removeForeignKeyChecks() {
    return knex.raw('SET foreign_key_checks = 0;');
}

function addForeignKeyChecks() {
    return knex.raw('SET foreign_key_checks = 1;');
}

module.exports = {
    removeForeignKeyChecks,
    addForeignKeyChecks
}