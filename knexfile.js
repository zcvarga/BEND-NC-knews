const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  ssl: true,
  connection: process.env.DATABASE_URL || 'localhost',
  seeds: {
    directory: './db/seed',
  },
  migrations: { directory: './db/migrations' },
};

const dbConfig = {
  development: {
    connection: {
      database: 'knews',
    },
  },
  test: {
    connection: {
      database: 'knews_test',
    },

  },
};


module.exports = { ...baseConfig, ...dbConfig[ENV] };
