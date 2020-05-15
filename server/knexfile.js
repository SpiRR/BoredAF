// Update with your config settings.
const dbcredentials = require('./db_config/dbconfig.js')

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: dbcredentials.database,
      user: dbcredentials.user,
      password: dbcredentials.password
    }
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
  }

};
