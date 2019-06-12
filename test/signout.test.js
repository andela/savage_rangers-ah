import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

const { expect } = chai;
let userToken = '';
chai.use(chaiHttp);

describe('testing the signout controller', () => {
  it('should login the user in order to have a token', (done) => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send({
        username: 'MCFrank16',
        email: 'mecfrank16@gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        userToken = res.body.user.token;
        done();
      });
  });
  it('should check if the token exist and destroy it', (done) => {
    chai
      .request(app)
      .get('/api/auth/signout')
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        expect(res.body).to.have.status(404);
        expect(res.body)
          .to.have.property('message')
          .eql('Token not found Please sign in again, Thanks');
        done();
      });
  });

  it("should check if the token doesn't exist and ask a user to sign in first", (done) => {
    chai
      .request(app)
      .get('/api/auth/signout')
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        expect(res.body).to.have.status(200);
        expect(res.body)
          .to.have.property('message')
          .eql('You are signed out');
        done();
      });
  });
});
