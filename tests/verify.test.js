import chai from 'chai';
import chaihttp from 'chai-http';
import createToken from '../src/helpers/tokens/generate.token';
import env from '../src/configs/environments';
import server from '../src/index';
import status from '../src/helpers/constants/status.codes';
import errorMessages from '../src/helpers/constants/error.messages';

chai.use(chaihttp);
chai.should();

describe('GET /verifyEmail', () => {
  it('Should return a success message if the link is valid', (done) => {
    const user = {
      username: 'Burindi',
      email: 'alain1@gmail.com',
      password: 'password23423'
    };

    const { username, email } = user;

    const verifytoken = createToken({ username, email }, env.secret);
    chai
      .request(server)
      .get(`/api/users/verifyEmail/${verifytoken}`)
      .end(async (err, res) => {
        await res.should.have.status(status.OK);
        await res.body.message.should.be.eq('Your email is successfully verified');
        done();
      });
  });

  it("Should return a message if a user doesn't exist", (done) => {
    const user = {
      username: 'BurindiAlain',
      email: 'alain@gmail.com',
      password: 'password23423',
      confirmPassword: 'password23423'
    };
    chai
      .request(server)
      .post('/api/users/signup')
      .send(user)
      .end();

    const { username } = user;

    const verifytoken = createToken({ username, email: 'dummy@email.com' }, env.secret);

    chai
      .request(server)
      .get(`/api/users/verifyEmail/${verifytoken}`)
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        res.body.errors.user.should.be.eq(errorMessages.noUser);
        done();
      });
  });

  it('Should respond with a message if the token is invalid', (done) => {
    const user = {
      username: 'Burindi',
      email: 'alain1@gmail.com',
      password: 'password23423'
    };

    chai
      .request(server)
      .post('/api/users/signup')
      .send(user)
      .end();

    const { username } = user;

    const verifytoken = createToken({ username }, 'env.secret');

    chai
      .request(server)
      .get(`/api/users/verifyEmail/${verifytoken}`)
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.errors.link.should.be.eq(errorMessages.emailLinkInvalid);
        done();
      });
  });
});
