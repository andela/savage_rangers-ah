import chai from 'chai';
import '@babel/polyfill';
import chaiHttp from 'chai-http';
import status from '../src/helpers/constants/status.codes';
// import models from '../src/api/models';

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
      .get('/api/articles/most/popular')
      .set('authorization', `${testUserToken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
});
