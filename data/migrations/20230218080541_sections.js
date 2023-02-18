/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable("sections" , (table) => {
        table.uuid("section_id").primary(); 
        table.string("name");
        table.integer("capacity").defaultTo(0);
        table.uuid("warehouse_id").references('warehouse_id').inTable('warehouses');
        table.boolean("is_deleted").defaultTo(false);
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable("sections");
};
