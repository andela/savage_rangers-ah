import chai from 'chai';
import '@babel/polyfill';
import chaiHttp from 'chai-http';
import status from '../src/helpers/constants/status.codes';

import server from '../src/index';
import errorMessage from '../src/helpers/constants/error.messages';

chai.use(chaiHttp);
chai.should();
let testUserToken;
let testUserToken2;

describe('Testing comment middlewares', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/users/login')
      .send({
        email: 'alain2@gmail.com',
        password: 'password23423'
      })
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.should.be.an('Object');
        testUserToken = res.body.user.token;
        done();
      });
  });
  before((done) => {
    chai
      .request(server)
      .post('/api/users/login')
      .send({
        email: 'alain1@gmail.com',
        password: 'password23423'
      })
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.should.be.an('Object');
        testUserToken2 = res.body.user.token;
        done();
      });
  });
  it('create comment', (done) => {
    chai
      .request(server)
      .post('/api/articles/How-to-create-sequalize-seeds/comments')
      .set('authorization', `${testUserToken2}`)
      .send({
        body: "Really interesting article. I've been searching for this"
      })
      .end((err, res) => {
        res.should.have.status(status.CREATED);
        done();
      });
  });
  it('Should respond if your not the owner of the comment', (done) => {
    chai
      .request(server)
      .patch('/api/articles/What-is-a-Version-1-UUID/comments/5')
      .set('authorization', `${testUserToken}`)
      .send({
        body: 'How to create sequalize seedss'
      })
      .end((err, res) => {
        res.should.have.status(status.ACCESS_DENIED);
        res.body.errors.userId.should.eq(errorMessage.notCommentOwner);
        done();
      });
  });
  it('Should respond when the comment id is not an integer', (done) => {
    chai
      .request(server)
      .patch('/api/articles/123/comments/al')
      .set('authorization', `${testUserToken}`)
      .send({
        body: "Really interesting article. I've been searching for this"
      })
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.errors.should.include({ 'url parameter': 'id must be a number' });
        done();
      });
  });
  it('should respond with an error if one of the get comments queries is not an integer', (done) => {
    chai
      .request(server)
      .get('/api/articles/How-to-create-sequalize-seeds/comments?offset=0&&limit=al')
      .set('authorization', `${testUserToken}`)
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.errors.should.include({ 'url parameter': 'limit must be a number' });
        done();
      });
  });
  it('should respond with an error if one of the get users rating queries is not an integer', (done) => {
    chai
      .request(server)
      .get('/api/articles/How-to-create-sequalize-seeds/4/users?limit=3&offset=al')
      .set('authorization', `${testUserToken}`)
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.errors.should.include({ 'url parameter': 'offset must be a number' });
        done();
      });
  });
  it('should get tags containing "IO"', (done) => {
    chai
      .request(server)
      .get('/api/articles/tags/query?tagNameContent=IO&offset=0&limit=al')
      .set('authorization', `${testUserToken}`)
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.errors.should.include({ 'url parameter': 'limit must be a number' });
        done();
      });
  });
});
