const moment = require('moment');

exports.formatDate = (data) => {
  const formattedData = data.map((element) => {
    // element.created_at = new Date(element.created_at).toISOString().split('T')[0];
    const newElement = { ...element };
    newElement.created_at = moment(element.created_at).format('YYYY-MM-DD');
    return newElement;
  });
  return formattedData;
};

exports.formatComments = (comments) => {
  const formatted = [...comments];
  formatted.map((comment) => {
    comment.author = comment.created_by;
    delete comment.created_by;
  });
  // console.log(formatted);
  return formatted;
};


exports.createRef = (data) => {
  const array = Object.values(data);
  const resultsObj = {};
  array.map((element) => {
    const newElement = { ...element };
    const value = newElement.article_id;
    const key = newElement.title;
    resultsObj[key] = value;
  });
  return resultsObj;
};


exports.formatCommentData = (ids, oldComments) => {
  const arrayRes = oldComments.map((element) => {
    const newElement = { ...element };
    newElement.article_id = ids[newElement.belongs_to];
    delete newElement.belongs_to;
    return newElement;
  });
  return arrayRes;
};
