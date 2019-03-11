
exports.up = function (knex, Promise) {
  return knex.schema.createTable('articles', (articlesTable) => {
    articlesTable.increments('article_id').primary();
    articlesTable.string('title').notNullable();
    articlesTable.string('body', 50000).notNullable();
    articlesTable.integer('votes').defaultTo(0);
    articlesTable.string('topic').references('slug').inTable('topics');
    articlesTable.string('author').references('username').inTable('users');
    articlesTable.date('created_at').defaultTo((knex.fn.now()));
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('articles');
};
