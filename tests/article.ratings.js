import chai from 'chai';
import '@babel/polyfill';
import chaiHttp from 'chai-http';
import status from '../src/helpers/constants/status.codes';

import server from '../src/index';

chai.use(chaiHttp);
chai.should();

// A user to enable tests
const user = {
  username: 'Yvy',
  email: 'kalim@gmail.com',
  password: 'Password233'
};

let userToken;

describe('Article ratings', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/users/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(status.CREATED);
        res.body.should.be.an('Object');
        userToken = res.body.user.token;
        done();
      });
  });
  it('Should get the ratings of a given article', (done) => {
    chai
      .request(server)
      .get('/api/article/How-to-create-sequalize-seeds/ratings?limit=4&offset=4')
      .set('authorization', `bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.data.details.should.be.an('Array');
        done();
      });
  });
  it("Should not get the ratings of an article that doesn't exist", (done) => {
    chai
      .request(server)
      .get('/api/article/How-to-create-sequalize-seedsd/ratings?limit=4&offset=4')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
  it('Should not get the ratings with a invalid offset', (done) => {
    chai
      .request(server)
      .get('/api/article/How-to-create-sequalize-seeds/ratings?limit=4&offset=64')
      .set('authorization', `bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
  it('Should not get the ratings without a token', (done) => {
    chai
      .request(server)
      .get('/api/article/How-to-create-sequalize-seeds/ratings?limit=4&offset=64')
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        done();
      });
  });
  it('Should not get the ratings with a invalid offset', (done) => {
    chai
      .request(server)
      .get('/api/article/How-to-create-sequalize-seeds/ratings?limit=4&offset=64')
      .set('authorization', `bearer f${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.UNAUTHORIZED);
        done();
      });
  });
});
