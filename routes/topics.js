const topicsRouter = require('express').Router();
const { sendTopics, postTopic } = require('../controllers/topics');
// const {
//   handle405
// } = require('../errors/index');

// topicsRouter.get('/', sendTopics);
topicsRouter.route('/')
  .get(sendTopics)
  .post(postTopic)
  // .all(handle405);
  .all((req, res, next) => {
    next({ status: 405 });
  });

module.exports = topicsRouter;
