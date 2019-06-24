import '@babel/polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import models from '../src/api/models/index';
import status from '../src/helpers/constants/status.codes';

import server from '../src/index';

chai.use(chaiHttp);
chai.should();

let authToken = '';
// to complete
describe('Like article', () => {
  it('should like an article', (done) => {
    chai
      .request(server)
      .post('/api/users/signup')
      .send({
        username: 'BurindiAlain',
        email: 'premices.tuvere@gmail.com',
        password: 'password123',
        confirmPassword: 'password123'
      })
      .end((err, res) => {
        authToken = res.body.user.token;
        models.Article.create();
        chai
          .request(server)
          .post('/api/articles/1/like?reaction=like')
          .set('Authorization', authToken)
          .end((err, res) => {
            res.should.status(status.CREATED);
            done();
          });
      });
  });

  it('should not like twice an article', (done) => {
    chai
      .request(server)
      .post('/api/articles/1/like?reaction=like')
      .set('Authorization', authToken)
      .end((err, res) => {
        res.should.status(status.BAD_REQUEST);
        res.body.errors.should.have
          .property('like', 'You are not allowed to like twice');
        done();
      });
  });
});

describe('Validation', () => {
  it('should require a valid token', (done) => {
    chai
      .request(server)
      .post('/api/articles/1/like')
      .end((err, res) => {
        res.should.status(status.UNAUTHORIZED);
        res.body.should.have
          .property('message', 'Authentication failed, please check your credentials');
        done();
      });
  });
  it('should require a valid action', (done) => {
    chai
      .request(server)
      .post('/api/articles/1/like')
      .set('Authorization', authToken)
      .end((err, res) => {
        res.should.status(status.BAD_REQUEST);
        res.body.errors.should.have
          .property('URL parameters', 'The action is required, either like or dislike');
        done();
      });
  });

  it('should require an existing article', (done) => {
    chai
      .request(server)
      .post('/api/articles/-1/like?reaction=like')
      .set('Authorization', authToken)
      .end((err, res) => {
        res.should.status(status.NOT_FOUND);
        res.body.errors.should.have
          .property('like', 'The article is not found, please provide a valid ID');
        done();
      });
  });
});
