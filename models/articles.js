const connection = require('../db/connection');

exports.getArticles = (conditions, sort, order) => connection
  .select('author', 'title', 'articles.article_id', 'topic', 'articles.created_at', 'articles.votes')
  .from('articles')
  .leftJoin('comments', 'articles.article_id', 'comments.article_id')
  .groupBy('articles.article_id')
  .count(' comments.article_id as comment_count')
  .orderBy(sort, order)
  .where(conditions);


exports.insertArticle = newArticle => connection.insert(newArticle).into('articles').returning('*');
