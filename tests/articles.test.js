import chai from 'chai';
import chaihttp from 'chai-http';
import server from '../src/index';
import status from '../src/helpers/constants/status.codes';
import errorMessage from '../src/helpers/constants/error.messages';

chai.use(chaihttp);
chai.should();

describe('GET /articles/:slug', () => {
  it('Should return the article', (done) => {
    chai
      .request(server)
      .get('/api/articles/How-to-create-sequalize-seeds')
      .end((err, res) => {
        res.should.have.a.status(status.OK);
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
        res.should.have.a.status(status.NOT_FOUND);
        res.body.should.be.an('object');
        res.body.errors.Article.should.be.eq(errorMessage.noArticles);
        done();
      });
  });
});

describe('GET /articles', () => {
  it('Should respond with a list of articles', (done) => {
    chai
      .request(server)
      .get('/api/articles/?page=1')
      .end((err, res) => {
        res.should.have.a.status(status.OK);
        res.body.Articles.should.be.an('array');
        res.body.should.have.property('Articles');
        done();
      });
  });
});
