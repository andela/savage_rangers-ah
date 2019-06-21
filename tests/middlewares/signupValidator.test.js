import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src';
import statusCode from '../../src/helpers/constants/status.codes';

chai.use(chaiHttp);
chai.should();
const fakeUser = {
  username: 'dgijh',
  email: 'murediana@gmail.com',
  password: 'diane3456',
  confirmPassword: 'diane34'
};

describe('Testing the signup validator', () => {
  it('should return an error if the email is invalid', (done) => {
    const { email, ...rest } = fakeUser;
    chai
      .request(app)
      .post('/api/users/signup')
      .send(rest)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(statusCode.BAD_REQUEST);
        expect(body).to.have.property('message', 'Please provide a valid email');
        done();
      });
  });

  it('should return an error if the userName is invalid', (done) => {
    const { username, ...rest } = fakeUser;
    chai
      .request(app)
      .post('/api/users/signup')
      .send(rest)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(statusCode.BAD_REQUEST);
        expect(body).to.have.property('message',
          'The username should only contain alphanumeric characters');
        done();
      });
  });

  it('should return an error if the password is invalid', (done) => {
    const { password, ...rest } = fakeUser;
    chai
      .request(app)
      .post('/api/users/signup')
      .send(rest)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(statusCode.BAD_REQUEST);
        expect(body).to.have.property('message',
          'Password should only be alphanumeric with at least 8 characters long');
        done();
      });
  });
});
