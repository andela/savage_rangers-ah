import chai from 'chai';
import '@babel/polyfill';
import chaiHttp from 'chai-http';
import isTokenValid from '../src/helpers/tokens/validate.token';
import generateToken from '../src/helpers/tokens/generate.token';
import generateLink from '../src/helpers/tokens/generate.link';
import status from '../src/helpers/constants/status.codes';
import errors from '../src/helpers/constants/error.messages';
import success from '../src/helpers/constants/success.messages';

import server from '../src/index';
import mailer from '../src/helpers/Mailer';

chai.use(chaiHttp);
chai.should();

const data = {
  username: 'BurindiAlainj',
  email: 'alainj@gmail.com',
  password: 'password23423',
  confirmPassword: 'password23423'
};

// The email of the user from the reset password endpoint

// the token to use in logging out
let userToken = '';

describe('Signup', () => {
  it('should register and give the token', (done) => {
    chai
      .request(server)
      .post('/api/users/signup')
      .send({
        ...data
      })
      .end((err, res) => {
        res.should.have.status(status.CREATED);
        res.body.should.have.property('message', success.accountCreated);
        done();
      });
  });
});

describe('Login', () => {
  it('should not login if the email is not verified', (done) => {
    chai
      .request(server)
      .post('/api/users/login')
      .send({
        email: data.email,
        password: 'password23423'
      })
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.errors.should.have.property('email', errors.emailNotConfirmed);
        done();
      });
  });
  it('should login and give a valid token', (done) => {
    chai
      .request(server)
      .post('/api/users/login')
      .send({
        email: 'alain1@gmail.com',
        password: 'password23423'
      })
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.should.have.property('user');
        res.body.user.should.have.property('email');
        res.body.user.should.have.property('token');
        res.body.user.should.have.property('username');
        userToken = res.body.user.token;
        const valid = isTokenValid(userToken, res.body.user);
        valid.should.be.a('boolean').equal(true);
        done();
      });
  });

  it('should not login with a wrong password', (done) => {
    chai
      .request(server)
      .post('/api/users/login')
      .send({
        email: 'alain1@gmail.com',
        password: 'passwor5535'
      })
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.should.have
          .property('errors')
          .which.has.property('error', errors.incorrectCredential);
        done();
      });
  });

  it('should not login an unexisting user', (done) => {
    chai
      .request(server)
      .post('/api/users/login')
      .send({
        email: 'alain666326@gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.should.have
          .property('errors')
          .which.has.property('error', errors.incorrectCredential);
        done();
      });
  });

  it('should logout a user', (done) => {
    chai
      .request(server)
      .get('/api/users/signout')
      .set('authorization', userToken)
      .end((err, res) => {
        res.body.should.have.status(status.OK);
        res.body.should.have.property('message', 'You are signed out');
        done();
      });
  });

  it('should check for a token and alert that it is no longer valid', (done) => {
    chai
      .request(server)
      .get('/api/users/signout')
      .set('Authorization', userToken)
      .end((err, res) => {
        res.body.should.have.status(status.UNAUTHORIZED);
        res.body.should.have.property('error').eql('Token is no longer valid');
        done();
      });
  });

  it('Should catch an error if the secret is not provided', () => {
    generateToken('user');
  });
});

describe('Validation', () => {
  it('should return false if the token is wrong', (done) => {
    const valid = isTokenValid('wrongtoken', data);
    valid.should.be.a('boolean').equal(false);
    done();
  });
});

describe('Password reset', () => {
  describe('Email sending', () => {
    it('should send an email to the user', (done) => {
      chai
        .request(server)
        .post('/api/password-reset')
        .send({ email: data.email })
        .end((err, res) => {
          res.should.have.status(status.OK);
          done();
        });
    });
    it('should not send an email when an invalid email address is provided', (done) => {
      chai
        .request(server)
        .post('/api/password-reset')
        .send({ email: 'email.email' })
        .end((err, res) => {
          res.should.have.status(status.BAD_REQUEST);
          done();
        });
    });
    it('should not send an email when an unknown email addres is provided', (done) => {
      chai
        .request(server)
        .post('/api/password-reset')
        .send({ email: 'email@email.com' })
        .end((err, res) => {
          res.should.have.status(status.NOT_FOUND);
          done();
        });
    });
  });
  describe('Link verification', () => {
    const token = generateLink(' ', { email: data.email }).split(' /')[1];
    it('should verify the link sent to the user', (done) => {
      chai
        .request(server)
        .get(`/api/password-reset/${token}`)
        .end(() => {
          done();
        });
    });
    it('should raise an error when a invalid token is provided', (done) => {
      chai
        .request(server)
        .get('/api/password-reset/sdfgfhsdgfe')
        .end((err, res) => {
          res.should.have.status(status.BAD_REQUEST);
          done();
        });
    });
  });
  describe('Password update', () => {
    it('should update the password', (done) => {
      chai
        .request(server)
        .post(`/api/password-reset/update/${data.email}`)
        .send({ password: 'passWORD123' })
        .end((err, res) => {
          res.should.have.status(status.OK);
          done();
        });
    });
    it('it should raise an error when an unknown email is provided', (done) => {
      chai
        .request(server)
        .post('/api/password-reset/update/email@gmail.com')
        .send({ password: 'passWORD123' })
        .end((err, res) => {
          res.should.have.status(status.NOT_FOUND);
          done();
        });
    });
    it('should raise an error when an invalid email is provided', (done) => {
      chai
        .request(server)
        .post('/api/password-reset/update/email@gmai')
        .send({ password: 'passWORD123' })
        .end((err, res) => {
          res.should.have.status(status.BAD_REQUEST);
          done();
        });
    });
  });
});

describe('Routes', () => {
  it('should not use an empty body object', (done) => {
    chai
      .request(server)
      .post('/api/password-reset/')
      .send({})
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        done();
      });
  });

  it('should not register with a used username', (done) => {
    data.email = 'data.email@em.com';
    chai
      .request(server)
      .post('/api/users/signup')
      .send({
        ...data
      })
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.errors.should.have.property('username', errors.usernameExists);
        done();
      });
  });
});

describe('Mailer', async () => {
  it('should execute without params', async () => {
    const test = await mailer();
    test.should.be.a('Error');
  });

  it('should execute with one param', async () => {
    await mailer('title', 'subject', 'reciever@example.com', 'notifications', {});
  });
});
