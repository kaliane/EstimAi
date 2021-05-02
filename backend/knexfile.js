// Update with your config settings.
const parse = require('pg-connection-string').parse;
const pgconfig = parse(process.env.DATABASE_URL + `?ssl=true`);
pgconfig.ssl = { rejectUnauthorized: false };

module.exports = {

  development: {
    client: 'pg',
    connection: {
      user : process.env.USER_KEY,
      password : process.env.PASSWORD_KEY,
      database : process.env.DATABASE_KEY
    },
    migrations: {
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: pgconfig,
    searchPath: ['knex', 'public'],
    /*connection: {
      host : process.env.PROD_HOST_KEY,
      user : process.env.PROD_USER_KEY,
      password : process.env.PROD_PASSWORD_KEY,
      database : process.env.PROD_DATABASE_KEY
    },*/
    pool: {
      min: 2,
      max: 50
    },
    migrations: {
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    },
    useNullAsDefault: true,
  }

};
