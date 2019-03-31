const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const apiRouter = require('./routes/api');
const {
  handle400, handle404, handle405, handle422, handle500,
} = require('./errors/index');

app.use(bodyParser.json());

app.use('/api/', apiRouter);

app.all('/*', (req, res, next) => {
  next({ status: 404, msg: 'Route Not Found' });
});

app
  .use(handle400)
  .use(handle404)
  .use(handle405)
  .use(handle422)
  .use(handle500);


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);

module.exports = app;


// app.use((req, res, next) => {
//   const error = new Error('Not found');
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message,
//     },
//   });
// });
