process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const supertest = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

const request = supertest(app);


describe('/', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('/api', () => {
    it('GET status:200, return all API endpoints', () => {

    });

    describe('/topics', () => {
      it('GET status: 200, returns the topics in an array', () => request.get('/api/topics')
        .expect(200)
        .then((res) => {
          // console.log(res.body);
          expect(res.body.topics).to.be.an('array');
          expect(res.body.topics[0]).to.contain.keys('slug', 'description');
        }));
      it('POST status: 201, returns the new topic as it appears in the database', () => {
        const topicToPost = {
          slug: 'horses',
          description: 'Magnificient animals',
        };
        return request.post('/api/topics')
          .send(topicToPost)
          .expect(201)
          .then(({ body }) => {
            expect(body.topic).to.contain.keys('slug', 'description');
            expect(body.topic.slug).to.equal(topicToPost.slug);
          });
      });
    });
    describe('/articles', () => {
      it('GET status:200, returns the articles in an array', () => request.get('/api/articles')
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
          expect(body.articles).to.be.an('array');
          expect(body.articles[0]).to.contain.keys('article_id', 'author', 'title', 'topic', 'created_at', 'votes', 'comment_count');
        }));
      it('GET status: 200, returns the article(s) requested in the query by author', () => request.get('/api/articles?author=butter_bridge')
        .expect(200)
        .then((res) => {
          // console.log(res.body);
          expect(res.body.articles[0].author).to.equal('butter_bridge');
          expect(res.body.articles.length).to.equal(3);
        }));
      it('GET status: 200, returns the article(s) requested in the query by topic', () => request.get('/api/articles?topic=cats')
        .expect(200)
        .then((res) => {
          // console.log(res.body.articles[0].topic);
          expect(res.body.articles[0].topic).to.equal('cats');
          expect(res.body.articles.length).to.equal(1);
        }));
      it('GET status: 200, returns the articles sorted by the column specified (author)', () => request.get('/api/articles?sort_by=author')
        .expect(200)
        .then((res) => {
          // console.log(res.body.articles);
          expect(res.body.articles[0].author >= res.body.articles[1].author).to.be.true;
          expect(res.body.articles[2].author >= res.body.articles[3].author).to.be.true;
          expect(res.body.articles[3].author >= res.body.articles[4].author).to.be.true;
          expect(res.body.articles[1].author >= res.body.articles[5].author).to.be.true;
        }));
      it('GET status: 200, returns the articles sorted by the column specified (article_id)', () => request.get('/api/articles?sort_by=article_id')
        .expect(200)
        .then((res) => {
          // console.log(res.body.articles);
          expect(res.body.articles[0].article_id >= res.body.articles[1].article_id).to.be.true;
          expect(res.body.articles[2].article_id >= res.body.articles[3].article_id).to.be.true;
          expect(res.body.articles[3].article_id >= res.body.articles[4].article_id).to.be.true;
          expect(res.body.articles[1].article_id >= res.body.articles[5].article_id).to.be.true;
        }));
      it('GET status: 200, returns the articles sorted by the column specified (votes)', () => request.get('/api/articles?sort_by=votes')
        .expect(200)
        .then((res) => {
          // console.log(res.body.articles);
          expect(res.body.articles[0].votes >= res.body.articles[1].votes).to.be.true;
          expect(res.body.articles[2].votes >= res.body.articles[3].votes).to.be.true;
          expect(res.body.articles[3].votes >= res.body.articles[4].votes).to.be.true;
          expect(res.body.articles[1].votes >= res.body.articles[5].votes).to.be.true;
        }));
      it('GET status: 200, returns the articles sorted by the column specified (DEFAULT = created_at)', () => request.get('/api/articles')
        .expect(200)
        .then((res) => {
          // console.log(res.body.articles);
          expect(res.body.articles[0].created_at >= res.body.articles[1].created_at).to.be.true;
          expect(res.body.articles[2].created_at >= res.body.articles[3].created_at).to.be.true;
          expect(res.body.articles[3].created_at >= res.body.articles[4].created_at).to.be.true;
          expect(res.body.articles[1].created_at >= res.body.articles[5].created_at).to.be.true;
        }));

      it('GET status: 200, returns the articles sorted by the column specified (DEFAULT = created_at)', () => request.get('/api/articles?order=asc')
        .expect(200)
        .then((res) => {
          // console.log(res.body.articles);
          expect(res.body.articles[0].created_at <= res.body.articles[1].created_at).to.be.true;
          expect(res.body.articles[2].created_at <= res.body.articles[3].created_at).to.be.true;
          expect(res.body.articles[3].created_at <= res.body.articles[4].created_at).to.be.true;
          expect(res.body.articles[1].created_at <= res.body.articles[5].created_at).to.be.true;
        }));
      it('POST status: 201, returns the new article as it appears in the database', () => {
        const articleToPost = {
          title: 'Article to insert into database',
          body: 'This is a nice long article about the difficulties of inserting into the articles table and cats, because cats are the best.',
          topic: 'cats',
          author: 'butter_bridge',
        };
        return request.post('/api/articles')
          .send(articleToPost)
          .expect(201)
          .then(({ body }) => {
            // console.log(body);
            expect(body.article).to.contain.keys('title', 'article_id', 'body', 'votes', 'topic', 'author', 'created_at');
            expect(body.article.author).to.equal(articleToPost.author);
          });
      });

      describe('/:article_id', () => {
        it('GET status: 200, returns the article which belongs to the article id', () => request.get('/api/articles/3')
          .expect(200)
          .then(({ body }) => {
            // console.log(body.article);
            expect(body.article[0]).to.contain.keys('title', 'article_id', 'body', 'votes', 'topic', 'author', 'created_at', 'comment_count');
            expect(body.article[0].article_id).to.equal(3);
          }));
        it('GET status: 200, returns the article which belongs to the article id', () => request.get('/api/articles/1')
          .expect(200)
          .then(({ body }) => {
            // console.log(body.article);
            expect(body.article[0]).to.contain.keys('title', 'article_id', 'body', 'votes', 'topic', 'author', 'created_at', 'comment_count');
            expect(body.article[0].article_id).to.equal(1);
          }));
        it('PATCH status: 200, returns the updated article ', () => {
          const infoToUpdate = { inc_votes: 50 };
          return request.patch('/api/articles/1')
            .send(infoToUpdate)
            .expect(200)
            .then(({ body }) => {
              expect(body.article[0]).to.contain.keys('article_id', 'title', 'body', 'votes', 'topic', 'author', 'created_at');
              expect(body.article[0].votes).to.equal(150);
            });
        });
        it('DELETE status:204, when given a valid a valid article_id', () => request.delete('/api/articles/1').expect(204));

        describe('/comments', () => {
          it('GET status: 200, returns the comments which belong to the article id', () => request.get('/api/articles/1/comments').expect(200)
            .then(({ body }) => {
              expect(body.comments.length).to.equal(13);
              expect(body.comments[0]).to.contain.keys('comment_id', 'votes', 'created_at', 'author', 'body');
            }));
          it('GET status: 200, returns the comments sorted by the column specified (comment_id)', () => request.get('/api/articles/1/comments?sort_by=comment_id')
            .expect(200)
            .then(({ body }) => {
              expect(body.comments[0].comment_id >= body.comments[1].comment_id).to.be.true;
              expect(body.comments[2].comment_id >= body.comments[3].comment_id).to.be.true;
              expect(body.comments[3].comment_id >= body.comments[4].comment_id).to.be.true;
              expect(body.comments[1].comment_id >= body.comments[5].comment_id).to.be.true;
            }));
          it('GET status: 200, returns the comments sorted by the column specified (comment_id)', () => request.get('/api/articles/1/comments?sort_by=votes&order=asc')
            .expect(200)
            .then(({ body }) => {
              expect(body.comments[0].votes <= body.comments[1].votes).to.be.true;
              expect(body.comments[2].votes <= body.comments[3].votes).to.be.true;
              expect(body.comments[3].votes <= body.comments[4].votes).to.be.true;
              expect(body.comments[1].votes <= body.comments[5].votes).to.be.true;
            }));


          it('POST status: 201, returns the new comment as it appears in the database', () => {
            const commentToPost = {
              author: 'butter_bridge',
              body: 'this is a new comment for the article',
            };
            return request.post('/api/articles/3/comments')
              .send(commentToPost)
              .expect(201)
              .then(({ body }) => {
                expect(body.comment[0]).to.contain.keys('comment_id', 'votes', 'created_at', 'author', 'body');
                expect(body.comment[0].author).to.equal(commentToPost.author);
              });
          });
        });
      });
    });

    describe('/comments/:comment_id', () => {
      it('PATCH status: 200, returns the updated comment ', () => {
        const infoToUpdate = { inc_votes: 50 };
        return request.patch('/api/comments/4')
          .send(infoToUpdate)
          .expect(200)
          .then(({ body }) => {
            // console.log(body);
            expect(body.comment[0]).to.contain.keys('article_id', 'body', 'comment_id', 'created_at', 'author', 'votes');
            expect(body.comment[0].votes).to.equal(-50);
          });
      });
      it('DELETE status: 204, when given a valid a valid comment_id', () => request.delete('/api/comments/4').expect(204));
    });

    describe('/users', () => {
      it('GET status: 200, returns the users in an array', () => request.get('/api/users')
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
          expect(body.users).to.be.an('array');
          expect(body.users[0]).to.contain.keys('username', 'name', 'avatar_url');
        }));
      it('POST status: 201, returns the new user as it appears in the database', () => {
        const userToPost = {
          name: 'Susie Varga',
          username: 's_varga',
          avatar_url: 'avatar url here',
        };
        return request.post('/api/users')
          .send(userToPost)
          .expect(201)
          .then(({ body }) => {
            expect(body.user).to.contain.keys('username', 'name', 'avatar_url');
            expect(body.user.username).to.equal(userToPost.username);
          });
      });
      describe('/:user_id', () => {
        it('GET status: 200, returns the user which belongs to the user id', () => request.get('/api/users/butter_bridge')
          .expect(200)
          .then(({ body }) => {
            // console.log(body.user);
            expect(body.user[0]).to.contain.keys('username', 'name', 'avatar_url');
            expect(body.user[0].username).to.equal('butter_bridge');
          }));
      });
    });
  });
});
