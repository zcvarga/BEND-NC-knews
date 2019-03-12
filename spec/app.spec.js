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
  });
});
