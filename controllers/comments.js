const { deleteComment, updateComment } = require('../models/comments');


exports.patchComment = (req, res, next) => {
  const { comment_id } = req.params;
  const whereConditions = {};
  if (comment_id) whereConditions.comment_id = comment_id;
  const { inc_votes } = req.body;

  if (!/[0-9]+/.test(inc_votes)) next({ status: 400 });
  else {
    updateComment(whereConditions, inc_votes).then(([comment]) => {
      res.status(200).send({ comment });
    })
      .catch(next);
  }
};


exports.removeComment = (req, res, next) => {
  const { comment_id } = req.params;
  const whereConditions = {};
  if (comment_id) whereConditions.comment_id = comment_id;

  deleteComment(whereConditions).then((numberOfThingsDeleted) => {
    if (!numberOfThingsDeleted) return Promise.reject({ status: 404 });
    res.sendStatus(204);
  })
    .catch(next);
};
