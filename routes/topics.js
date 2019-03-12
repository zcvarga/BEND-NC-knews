const topicsRouter = require('express').Router();
const { sendTopics, postTopic } = require('../controllers/topics');

// topicsRouter.get('/', sendTopics);
topicsRouter.route('/')
  .get(sendTopics)
  .post(postTopic);

module.exports = topicsRouter;
