import chai from 'chai';
import '@babel/polyfill';
import chaiHttp from 'chai-http';
import status from '../src/helpers/constants/status.codes';
import models from '../src/api/models';

import server from '../src/index';

chai.use(chaiHttp);
chai.should();

// The test user
const data = {
  email: 'alain1@gmail.com',
  password: 'password23423'
};

let testUserToken;

describe('Article tags', async () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/users/login')
      .send(data)
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.should.be.an('Object');
        testUserToken = res.body.user.token;
        done();
      });
  });
  it('should get all the tags of an article', (done) => {
    chai
      .request(server)
      .get('/api/articles/How-to-create-sequalize-seeds/tags')
      .set('authorization', `${testUserToken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
  it('should notify when the tag list is empty', (done) => {
    models.ArticleTag.truncate({ cascade: true });
    chai
      .request(server)
      .get('/api/articles/How-to-create-sequalize-seeds/tags')
      .set('authorization', `${testUserToken}`)
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
});

describe('Query tags table', () => {
  it('should get tags containing "IO"', (done) => {
    chai
      .request(server)
      .get('/api/articles/tags/query?tagNameContent=IO&offset=0&limit=2')
      .set('authorization', `${testUserToken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
  it('should not get tags with invalid entries', (done) => {
    chai
      .request(server)
      .get('/api/articles/tags/query?tagNameContent=IO&offset=5&limit=2')
      .set('authorization', `${testUserToken}`)
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
});

describe('List of Tags', () => {
  it('should return a list of tags', (done) => {
    chai
      .request(server)
      .get('/api/tags')
      .end((err, res) => {
        res.body.should.have.status(status.OK);
        res.body.tags.should.be.an('array');
        res.body.tags[0].name.should.eq('Iot');
        done();
      });
  });
});
