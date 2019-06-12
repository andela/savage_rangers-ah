import chai from 'chai';
import chaihttp from 'chai-http';
import createToken from '../src/helpers/tokens/generate.token';
import environment from '../src/configs/environments';
import server from '../src/index';

const env = environment.currentEnv;

chai.use(chaihttp);
chai.should();


describe('GET /verifyEmail', () => {
  it('Should return a success message if  the token in the link is valid', (done) => {
    const user = {
      username: 'jake96',
      email: 'test@example.com',
      password: 'xxx23XX'
    };

    chai
      .request(server)
      .post('/api/auth/signup')
      .send(user)
      .end();

    const { username, email } = user;

    const verifytoken = createToken({ username, email }, env.secret);

    chai
      .request(server)
      .get(`/api/auth/verifyEmail/${verifytoken}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.be.eq('Your email is successfully verified');
        done();
      });
  });

  it('Should return a message user doesn\'t exist if   the token is invalid', (done) => {
    const user = {
      username: 'jake96',
      email: 'test@example.com',
      password: 'xxx23XX'
    };

    chai
      .request(server)
      .post('/api/auth/signup')
      .send(user)
      .end();

    const { username } = user;

    const verifytoken = createToken({ username }, 'env.secret');

    chai
      .request(server)
      .get(`/api/auth/verifyEmail/${verifytoken}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.message.should.be.eq('User doesn\'t exist.');
        done();
      });
  });
});
