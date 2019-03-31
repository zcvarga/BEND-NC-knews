const usersRouter = require('express').Router();
const { sendUsers, postUser, sendUser } = require('../controllers/users');
// const {
//   handle405
// } = require('../errors/index');

usersRouter.route('/')
  .get(sendUsers)
  .post(postUser)
  // .all(handle405)
  .all((req, res, next) => {
    next({ status: 405 });
  });

usersRouter.route('/:username')
  .get(sendUser)
  // .all(handle405)
  .all((req, res, next) => {
    next({ status: 405 });
  });
module.exports = usersRouter;
