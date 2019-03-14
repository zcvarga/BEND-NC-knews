const topicsRouter = require('express').Router();
const { sendTopics, postTopic } = require('../controllers/topics');

// topicsRouter.get('/', sendTopics);
topicsRouter.route('/')
  .get(sendTopics)
  .post(postTopic)
  .all((req, res, next) => {
    next({ status: 405 });
  });

module.exports = topicsRouter;
