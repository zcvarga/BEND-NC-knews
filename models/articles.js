const connection = require('../db/connection');

exports.getArticles = (conditions, sort, order) => connection

  .select('articles.author', 'title', 'articles.article_id', 'topic', 'articles.created_at', 'articles.votes')
  .from('articles')
  .leftJoin('comments', 'articles.article_id', 'comments.article_id')
  .groupBy('articles.article_id')
  .count(' comments.article_id as comment_count')
  .orderBy(sort, order)
  .where(conditions)
  .returning('*');


exports.insertArticle = newArticle => connection.insert(newArticle).into('articles').returning('*');

exports.getArticle = conditions => connection

  .select('articles.author', 'title', 'articles.article_id', 'topic', 'articles.created_at', 'articles.votes', 'articles.body')
  .from('articles')
  .leftJoin('comments', 'articles.article_id', 'comments.article_id')
  .groupBy('articles.article_id')
  .count(' comments.article_id as comment_count')
  .where(conditions)
  .returning('*');

exports.updateArticle = (conditions, inc_votes) => connection
  .select('*')
  .from('articles')
  .where(conditions)
  .increment('votes', inc_votes)
  .returning('*');

exports.deleteArticle = conditions => connection.from('articles').where(conditions).del();

exports.getCommentsByArticleId = (sort, order, conditions) => connection

  .select('comment_id', 'votes', 'created_at', 'author', 'body')
  .from('comments')
  .orderBy(sort, order)
  .where(conditions)
  .returning('*');

exports.insertCommentByArticleId = newComment => connection.insert(newComment).into('comments').returning('*');
