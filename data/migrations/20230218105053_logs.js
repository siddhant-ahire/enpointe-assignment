exports.up = async function(knex) {
    await knex.schema.createTable("logs" , (table) => {
        table.increments("id").primary().comment('Auto-generated id');; 
        table.text("log_data");
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable("logs");
};
