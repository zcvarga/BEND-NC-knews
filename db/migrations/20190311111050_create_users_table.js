
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (usersTable) => {
    usersTable.string('username', 50).primary();
    usersTable.string('avatar_url').notNullable();
    usersTable.string('name', 100);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users');
};
