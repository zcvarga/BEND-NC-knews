const usersRouter = require('express').Router();
const { sendUsers, postUser, sendUser } = require('../controllers/users');

usersRouter.route('/')
  .get(sendUsers)
  .post(postUser)
  .all((req, res, next) => {
    next({ status: 405 });
  });

usersRouter.route('/:username')
  .get(sendUser);
module.exports = usersRouter;
