const commentsRouter = require('express').Router();
const { removeComment, patchComment } = require('../controllers/comments');
// const {
//   handle405
// } = require('../errors/index');

commentsRouter.route('/:comment_id')
  .patch(patchComment)
  .delete(removeComment)
  // .all(handle405)
  .all((req, res, next) => {
    next({ status: 405 });
  });

module.exports = commentsRouter;
