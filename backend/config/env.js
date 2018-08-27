require('./../core/env.init'); // run env initialization

// File with constants
const config = {
  app: {
    jwtExpireDuration: 86400 * 60, // 2 months
    password: {
      recovery_timeout: 600 // 30 минут
    },
  },
  database: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './config/database/migrations'
    },
    seeds: {
      directory: './config/database/seeds'
    },
    pool: {
      min: 1,
      max: 1
    }
  },
  json: { pretty: false },
};

module.exports = config;