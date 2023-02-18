const path = require("path")
const knex = require("knex");
const knexfile = require("../knexfile");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") })

const env = process.env.NODE_ENV || "development";
const configOptions = knexfile[env];
//console.debug(configOptions, "configOptions");
module.exports = knex(configOptions);