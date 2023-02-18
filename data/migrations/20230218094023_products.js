exports.up = async function(knex) {
    await knex.schema.createTable("products" , (table) => {
        table.uuid("product_id").primary(); 
        table.string("name");
        table.integer("quantity").defaultTo(0);
        table.uuid("category_id").references('categories.category_id');
        table.uuid("section_id").references('sections.section_id');
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable("products");
};
