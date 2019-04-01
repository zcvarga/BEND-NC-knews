const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
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
  production: {
    ssl: true,
    connection: process.env.DATABASE_URL,
  },
};


module.exports = { ...baseConfig, ...dbConfig[ENV] };
