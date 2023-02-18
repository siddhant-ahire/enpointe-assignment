exports.up = async function(knex) {
    await knex.schema.createTable("users" , (table) => {
        table.uuid("user_id").primary(); 
        table.string("username").unique().notNullable();
        table.string("password");
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable("users");
};
