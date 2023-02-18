/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable("warehouses" , (table) => {
        table.uuid("warehouse_id").primary(); 
        table.string("name");
        table.text("location");
        table.integer("unique_code").unique().notNullable();
        table.string("status").defaultTo("inactive");
        table.integer("capacity").defaultTo(0);
        table.integer("total_capacity").defaultTo(0);
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable("warehouses");
};
