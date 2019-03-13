const commentsRouter = require('express').Router();
const { removeComment, patchComment } = require('../controllers/comments');


commentsRouter.route('/:comment_id')
  .patch(patchComment)
  .delete(removeComment);

module.exports = commentsRouter;
