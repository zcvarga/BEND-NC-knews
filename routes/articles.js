const articlesRouter = require('express').Router();
const {
  sendArticles, postArticles, sendArticle, patchArticle, removeArticle, sendCommentsByArticleId, postCommentByArticleId,
} = require('../controllers/articles');


articlesRouter.route('/')
  .get(sendArticles)
  .post(postArticles)
  .all((req, res, next) => {
    next({ status: 405 });
  });

articlesRouter.route('/:article_id')
  .get(sendArticle)
  .patch(patchArticle)
  .delete(removeArticle);

articlesRouter.route('/:article_id/comments')
  .get(sendCommentsByArticleId)
  .post(postCommentByArticleId)
  .all((req, res, next) => {
    next({ status: 405 });
  });

module.exports = articlesRouter;
