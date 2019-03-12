const { getTopics, insertTopic } = require('../models/topics');

exports.sendTopics = (req, res, next) => {
  getTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};


exports.postTopic = (req, res, next) => {
  const topicToPost = req.body;
  insertTopic(topicToPost)
    .then(([topic]) => {
      res.status(201).send({ topic });
    });
};
