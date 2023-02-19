/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const AFTER_PRODUCT_INSERT = `
    CREATE TRIGGER after_product_insert
    AFTER INSERT
    ON products FOR EACH ROW
        INSERT INTO logs(log_data)
        VALUES(CONCAT('NEW PRODUCT ', NEW.name, 'INSERTED'));`;

const DROP_AFTER_PRODUCT_INSERT = `DROP TRIGGER after_product_insert`

exports.up = async function(knex) {
  await knex.raw(AFTER_PRODUCT_INSERT);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(DROP_AFTER_PRODUCT_INSERT)
};
