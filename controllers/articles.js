const { getArticles, insertTopic } = require('../models/articles');

exports.sendArticles = (req, res, next) => {
  const { author, topic } = req.query;
  console.log(req.query);
  const whereConditions = {};
  if (author) whereConditions.author = author;
  if (topic) whereConditions.topic = topic;
  // if (author) console.log(author)
  // console.log(whereConditions)
  getArticles(whereConditions).then((articles) => {
    res.status(200).send({ articles });
  });
};
