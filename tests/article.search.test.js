import chai from 'chai';
import '@babel/polyfill';
import chaiHttp from 'chai-http';
import status from '../src/helpers/constants/status.codes';
import errors from '../src/helpers/constants/error.messages';

import server from '../src/index';

chai.use(chaiHttp);
chai.should();

describe('Search functinality', () => {
  it('Should search for available articles by Title', (done) => {
    chai
      .request(server)
      .get('/api/articles/search?title=What')
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.articles.rows[0].title.should.contains('What');
        res.body.should.have.property('articles');
        done();
      });
  });
  it('Should search for available articles using Author', (done) => {
    chai
      .request(server)
      .get('/api/articles/search?username=B')
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.articles.rows[0].User.username.should.contains('B');
        res.body.should.have.property('articles');
        done();
      });
  });
  it('Should search for available articles by Content', (done) => {
    chai
      .request(server)
      .get('/api/articles/search?body=a&&offset=0&&limit=20')
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.should.have.property('articles');
        res.body.articles.rows[0].body.should.contains('a');
        done();
      });
  });

  it('Should search for available articles by Tag', (done) => {
    chai
      .request(server)
      .get('/api/articles/search?tag=I')
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.articles.rows[0].Tags[0].name.should.contains('I');
        res.body.should.have.property('articles');
        done();
      });
  });

  it('Should send an error if no article found is found', (done) => {
    chai
      .request(server)
      .get('/api/articles/search')
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        res.body.should.have.property('message', errors.noResult);
        done();
      });
  });
});
