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
