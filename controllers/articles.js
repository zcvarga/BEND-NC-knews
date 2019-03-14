const {
  getArticles, insertArticle, getArticle, updateArticle, deleteArticle, getCommentsByArticleId, insertCommentByArticleId,
} = require('../models/articles');

exports.sendArticles = (req, res, next) => {
  const { author, topic } = req.query;
  const whereConditions = {};
  if (author) whereConditions['articles.author'] = author;
  if (topic) whereConditions.topic = topic;
  const sort = req.query.sort_by || 'created_at';
  const order = req.query.order || 'desc';
  if (order !== 'desc' && order !== 'asc') next({ status: 400 });
  else {
    getArticles(whereConditions, sort, order).then((articles) => {
      if (articles[0]) res.status(200).send({ articles });
      else return Promise.reject({ status: 404 });
    })
      .catch(next);
  }
};

exports.postArticles = (req, res, next) => {
  const articleToPost = req.body;
  insertArticle(articleToPost)
    .then(([article]) => {
      res.status(201).send({ article });
    })
    .catch(next);
};

exports.sendArticle = (req, res, next) => {
  const { article_id } = req.params;
  const whereConditions = {};
  if (article_id) whereConditions['articles.article_id'] = article_id;
  getArticle(whereConditions).then((article) => {
    if (article[0]) res.status(200).send({ article });
    else return Promise.reject({ status: 404 });
  })
    .catch(next);
};

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const whereConditions = {};
  if (article_id) whereConditions.article_id = article_id;
  const { inc_votes } = req.body;

  if (!/[0-9]+/.test(inc_votes)) next({ status: 400 });
  else {
    updateArticle(whereConditions, inc_votes).then((article) => {
      res.status(200).send({ article });
    })
      .catch(next);
  }
};

exports.removeArticle = (req, res, next) => {
  const { article_id } = req.params;
  const whereConditions = {};
  if (article_id) whereConditions.article_id = article_id;


  deleteArticle(whereConditions).then((numberOfThingsDeleted) => {
    if (!numberOfThingsDeleted) return Promise.reject({ status: 404 });
    res.sendStatus(204);
  }).catch(next);
};

exports.sendCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const whereConditions = {};
  if (article_id) whereConditions.article_id = article_id;
  const sort = req.query.sort_by || 'created_at';
  const order = req.query.order || 'desc';
  if (order !== 'desc' && order !== 'asc') next({ status: 400 });
  else {
    getCommentsByArticleId(sort, order, whereConditions).then((comments) => {
      if (comments[0]) res.status(200).send({ comments });
      else return Promise.reject({ status: 404 });
    })
      .catch(next);
  }
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const commentToPost = req.body;
  const whereConditions = {};
  if (article_id) whereConditions.article_id = article_id;
  const dataForCommentToInsert = { ...whereConditions, ...commentToPost };

  insertCommentByArticleId(dataForCommentToInsert).then((comment) => {
    res.status(201).send({ comment });
  })
    .catch(next);
};
