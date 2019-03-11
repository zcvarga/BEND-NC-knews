const {
    articleData, topicData, userData, commentData,
} = require('../data');
const { formatDate, createRef, formatCommentData } = require('../utils/index');


exports.seed = function (knex, Promise) {
    // console.log(articleData);

    return knex.migrate.rollback()
        .then(() => knex.migrate.latest()) // implicit return (automatically returns what is on the right of the arrow)
        .then(() => knex.insert(topicData).into('topics').returning('*'))
        .then(insertedTopics => knex.insert(userData).into('users').returning('*'))
        .then((insertedUsers) => {
            const formattedDate = formatDate(articleData);
            return knex.insert(formattedDate).into('articles').returning('*');
        })
        .then((insertedArtciles) => {
            const formattedDate = formatDate(commentData);
            const reference = createRef(insertedArtciles);
            const commentsToInsert = formatCommentData(references, articleData)
            console.log(commentsToInsert)
            return knex.insert(formattedDate).into('comments');
        });
};


// articleData.forEach(element => {
//     element.created_at = new Date(element.created_at).toISOString().split('T')[0]
// })
