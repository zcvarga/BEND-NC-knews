const { getUsers, insertUser, getUser } = require('../models/users');

exports.sendUsers = (req, res, next) => {
  getUsers().then((users) => {
    res.status(200).send({ users });
  })
    .catch(next);
};

exports.postUser = (req, res, next) => {
  const userToPost = req.body;
  insertUser(userToPost)
    .then(([user]) => {
      res.status(201).send({ user });
    })
    .catch(next);
};

exports.sendUser = (req, res, next) => {
  const { username } = req.params;
  const whereConditions = {};
  if (username) whereConditions.username = username;
  getUser(whereConditions).then((user) => {
    if (user[0]) res.status(200).send({ user });
    else return Promise.reject({ status: 404 });
  })
    .catch(next);
};
