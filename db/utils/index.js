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
  const array = Object.values(data)
  console.log(Object.keys(array[0]))
  const resultsObj = {};
  const result = array.map(element => {
    let value = element['article_id'];
    let key = element['title'];

    resultsObj[key] = value;
  });
  //console.log(resultsObj)
  return resultsObj;
}