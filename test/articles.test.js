import chai from 'chai';
import chaihttp from 'chai-http';
import server from '../src/index';
import model from '../src/api/models/index';

chai.use(chaihttp);
chai.should();

describe('GET /articles/:slug', () => {
  it('Should return the article', (done) => {
    chai
      .request(server)
      .get('/api/articles/How-to-create-sequalize-seeds')
      .end((err, res) => {
        res.should.have.a.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('article');
        done();
      });
  });

  it('Should return a  message when article not found', (done) => {
    chai
      .request(server)
      .get('/api/articles/How-to-create-sequalize-seed')
      .end((err, res) => {
        res.should.have.a.status(404);
        res.body.should.be.an('object');
        res.body.message.should.be.eq('Not found');
        done();
      });
  });
});

describe('GET /articles', () => {
  it('Should respond with a list of articles', (done) => {
    chai
      .request(server)
      .get('/api/articles')
      .end((err, res) => {
        res.should.have.a.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('articles');
        done();
      });
  });
  it('Should respond with a message if there no articles', (done) => {
    const { Article } = model;
    Article.truncate({ cascade: true });
    chai
      .request(server)
      .get('/api/articles')
      .end((err, res) => {
        res.should.have.a.status(404);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.message.should.be.eq('There are no articles at the moment, Please try again later');
        done();
      });
  });
});

