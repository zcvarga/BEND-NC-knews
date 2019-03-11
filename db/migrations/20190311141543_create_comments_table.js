
exports.up = function (knex, Promise) {
  return knex.schema.createTable('comments', (commentsTable) => {
    commentsTable.increments('comment_id').primary();
    commentsTable.string('created_by').references('username').inTable('users');
    commentsTable.integer('belongs_to').references('article_id').inTable('articles');
    commentsTable.integer('votes').defaultTo(0);
    commentsTable.date('created_at').defaultTo((knex.fn.now()));
    commentsTable.string('body', 50000).notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('comments');
};
