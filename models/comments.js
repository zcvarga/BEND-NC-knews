const connection = require('../db/connection');

exports.updateComment = (conditions, inc_votes) => connection
  .select('*')
  .from('comments')
  .where(conditions)
  .increment('votes', inc_votes)
  .returning('*');

exports.deleteComment = conditions => connection.from('comments').where(conditions).del();
