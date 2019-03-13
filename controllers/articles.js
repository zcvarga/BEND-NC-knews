const {
  getArticles, insertArticle, getArticle, updateArticle, deleteArticle, getCommentsByArticleId, insertCommentByArticleId,
} = require('../models/articles');

exports.sendArticles = (req, res, next) => {
  const { author, topic } = req.query;
  const whereConditions = {};
  if (author) whereConditions.author = author;
  if (topic) whereConditions.topic = topic;
  const sort = req.query.sort_by || 'created_at';
  const order = req.query.order || 'desc';

  getArticles(whereConditions, sort, order).then((articles) => {
    res.status(200).send({ articles });
  });
};

exports.postArticles = (req, res, next) => {
  const articleToPost = req.body;
  insertArticle(articleToPost)
    .then(([article]) => {
      res.status(201).send({ article });
    });
};

exports.sendArticle = (req, res, next) => {
  const { article_id } = req.params;
  const whereConditions = {};
  if (article_id) whereConditions['articles.article_id'] = article_id;
  getArticle(whereConditions).then((article) => {
    res.status(200).send({ article });
  });
};

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const whereConditions = {};
  if (article_id) whereConditions.article_id = article_id;
  const { inc_votes } = req.body;

  updateArticle(whereConditions, inc_votes).then((article) => {
    res.status(200).send({ article });
  });
};

exports.removeArticle = (req, res, next) => {
  const { article_id } = req.params;
  const whereConditions = {};
  if (article_id) whereConditions.article_id = article_id;

  deleteArticle(whereConditions).then(() => {
    res.sendStatus(204);
  });
};

exports.sendCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const whereConditions = {};
  if (article_id) whereConditions.article_id = article_id;
  const sort = req.query.sort_by || 'created_at';
  const order = req.query.order || 'desc';

  getCommentsByArticleId(sort, order, whereConditions).then((comments) => {
    res.status(200).send({ comments });
  });
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const commentToPost = req.body;
  const whereConditions = {};
  if (article_id) whereConditions.article_id = article_id;
  const dataForCommentToInsert = { ...whereConditions, ...commentToPost };

  insertCommentByArticleId(dataForCommentToInsert).then((comment) => {
    res.status(201).send({ comment });
  });
};
