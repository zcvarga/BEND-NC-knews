const apiRouter = require('express').Router();
const topicsRouter = require('./topics');
const articlesRouter = require('./articles');
const commentsRouter = require('./comments');
const usersRouter = require('./users');


apiRouter.use('/topics', topicsRouter);

apiRouter.use('/articles', articlesRouter);

apiRouter.use('/comments', commentsRouter);

apiRouter.use('/users', usersRouter);

//apiRouter.get( get json send it to user)


module.exports = apiRouter;
