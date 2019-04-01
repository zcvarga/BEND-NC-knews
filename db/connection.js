
const knex = require('knex');
const dbConfig = require('../knexfile.js'); // change??

const connection = knex(dbConfig);

module.exports = connection;
