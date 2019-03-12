const { getArticles, insertTopic } = require('../models/articles');

exports.sendArticles = (req, res, next) => {
  const { author, topic } = req.query;
  // console.log(req.query);
  const whereConditions = {};
  if (author) whereConditions.author = author;
  if (topic) whereConditions.topic = topic;

  const sort = req.query.sort_by || 'created_at';
  const order = req.query.order || 'desc';

  // if (author) console.log(author)
  // console.log(whereConditions)
  getArticles(whereConditions, sort, order).then((articles) => {
    res.status(200).send({ articles });
  });
};
