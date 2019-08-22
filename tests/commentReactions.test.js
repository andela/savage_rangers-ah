import chai from 'chai';
import '@babel/polyfill';
import chaiHttp from 'chai-http';
import statusCode from '../src/helpers/constants/status.codes';
import server from '../src/index';

chai.use(chaiHttp);
chai.should();
let userToken;

const { expect } = chai;
describe('react on  comment', () => {
  it('should login a user and get a token ', (done) => {
    chai
      .request(server)
      .post('/api/users/login')
      .send({
        email: 'alain1@gmail.com',
        password: 'password23423'
      })
      .end((err, res) => {
        userToken = res.body.user.token;
        done();
      });
  });
  it('should  like a comment', (done) => {
    chai
      .request(server)
      .post('/api/comment/dislikes/5')
      .set('authorization', userToken)
      .end((err, res) => {
        const { status } = res;
        expect(status).to.equal(statusCode.CREATED);
        expect(res.body)
          .to.have.property('message')
          .eql('You have successfully  disliked this comment');
        done();
      });
  });
  it('should count likes for  a comment  ', (done) => {
    chai
      .request(server)
      .get('/api/comment/likes/5')
      .set('authorization', userToken)
      .end((err, res) => {
        const { status } = res;
        expect(status).to.equal(statusCode.OK);
        expect(res.body).to.have.property('likeCount');
        done();
      });
  });
  it('should   not dislike a comment twice ', (done) => {
    chai
      .request(server)
      .post('/api/comment/dislikes/5')
      .set('authorization', userToken)
      .end((err, res) => {
        const { status } = res;
        expect(status).to.equal(statusCode.BAD_REQUEST);
        expect(res.body)
          .to.have.property('message')
          .eql('You have already disliked this comment!');
        done();
      });
  });
  it('should  like a comment  ', (done) => {
    chai
      .request(server)
      .post('/api/comment/likes/6')
      .set('authorization', userToken)
      .end((err, res) => {
        const { status } = res;
        expect(status).to.equal(statusCode.CREATED);
        expect(res.body)
          .to.have.property('message')
          .eql('You have successfully  liked this comment');
        done();
      });
  });
  it('should count dislikes for  a comment  ', (done) => {
    chai
      .request(server)
      .get('/api/comment/dislikes/6')
      .set('authorization', userToken)
      .end((err, res) => {
        const { status } = res;
        expect(status).to.equal(statusCode.OK);
        expect(res.body).to.have.property('disLikeCount');
        done();
      });
  });
  it('should not like a comment twice', (done) => {
    chai
      .request(server)
      .post('/api/comment/likes/6')
      .set('authorization', userToken)
      .end((err, res) => {
        const { status } = res;

        expect(status).to.equal(statusCode.BAD_REQUEST);
        expect(res.body)
          .to.have.property('message')
          .eql('You have already liked this comment!');
        done();
      });
  });
});
