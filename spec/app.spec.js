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
        });
    });
});
