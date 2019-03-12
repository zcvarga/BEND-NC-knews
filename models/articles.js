const connection = require('../db/connection');

exports.getArticles = (conditions) => {
  console.log(conditions);
  return connection
    .select('author', 'title', 'articles.article_id', 'topic', 'articles.created_at', 'articles.votes')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .count(' comments.article_id as comment_count')
    .where(conditions);
};
