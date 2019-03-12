const moment = require('moment');

exports.formatDate = (data) => {
  // console.log(data[0])
  data.forEach((element) => {
    // element.created_at = new Date(element.created_at).toISOString().split('T')[0];
    element.created_at = moment(element.created_at).format('YYYY-MM-DD');
  });
  // console.log(data[0])
  return data;
};


exports.createRef = (data) => {
  const array = Object.values(data);
  // console.log(Object.values(array[0]))
  const resultsObj = {};
  const result = array.map((element) => {
    // console.log(element);
    const value = element.article_id;
    const key = element.title;

    resultsObj[key] = value;
  });
  // console.log(resultsObj)
  return resultsObj;
};


exports.formatCommentData = (ids, oldComments) => {
  // console.log(oldComments)
  const arrayRes = oldComments.map((element) => {
    element.article_id = ids[element.belongs_to];
    // console.log(ids[element.id]);
    delete element.belongs_to;
    return element;
  });
  // console.log(arrayRes)
  return arrayRes;
};
