const articlesRouter = require('express').Router();
const { sendArticles, postArticles } = require('../controllers/articles');


articlesRouter.route('/')
  .get(sendArticles)
  .post(postArticles);

module.exports = articlesRouter;
