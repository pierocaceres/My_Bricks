require('dotenv').config()
module.exports = {
  development: {
    database: 'My_Bricks_database',
    dialect: 'postgres'
  },
  test: {
    database: 'My_Bricks_database',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
}