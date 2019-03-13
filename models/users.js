const connection = require('../db/connection');

exports.getUsers = () => connection.select('*').from('users');

exports.insertUser = newUser => connection.insert(newUser).into('users').returning('*');

exports.getUser = conditions => connection.select('*').from('users').where(conditions);
