require('dotenv').config();
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

    development: {
        client: 'mysql',
        connection: {
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_DATABASE,
        },
        migrations: {
            directory: './data/migrations',
            tableName: 'knex_migrations'
        },
          seeds: {directory: './data/seeds'},
          searchPath: ['knex', 'public']
    },

    // staging: {
    //     client: 'mysql',
    //     connection: {
    //         database: 'my_db',
    //         user: 'username',
    //         password: 'password'
    //     },
    //     pool: {
    //         min: 2,
    //         max: 10
    //     },
    //     migrations: {
    //         tableName: 'knex_migrations'
    //     }
    // },

    // production: {
    //     client: 'mysql',
    //     connection: {
    //         database: 'my_db',
    //         user: 'username',
    //         password: 'password'
    //     },
    //     pool: {
    //         min: 2,
    //         max: 10
    //     },
    //     migrations: {
    //         tableName: 'knex_migrations'
    //     }
    // }

};
