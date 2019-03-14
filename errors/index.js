exports.handle400 = (err, req, res, next) => {
  // console.log('handle400');
  if (err.code === '23502' || err.code === '42703' || err.code === '23503' || err.code === '22P02' || err.status === 400) res.status(400).send({ msg: 'Bad Request' });
  else next(err);
};

exports.handle404 = (err, req, res, next) => {
  // console.log('handle404');
  if (err.status === 404) res.status(err.status).send({ msg: err.msg || 'Route Not Found' });
  else next(err);
};

exports.handle405 = (err, req, res, next) => {
  // console.log('handle405');
  if (err.status === 405) res.status(405).send({ msg: 'Method Not Allowed' });
  else next(err);
};

exports.handle422 = (err, req, res, next) => {
  // console.log('handle422');
  if (err.code === '23505') res.status(422).send({ msg: 'Duplicate key value violates unique constraint' });
  else next(err);
};

exports.handle500 = (err, req, res, next) => {
  // console.log('handle500');
  console.log(err);
  res.status(500).send({ msg: 'Internal Server Error' });
};


// object or message for errot handling
