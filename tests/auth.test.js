import chai from 'chai';
import '@babel/polyfill';
import chaiHttp from 'chai-http';
import isTokenValid from '../src/helpers/tokens/validate.token';
import generateToken from '../src/helpers/tokens/generate.token';
import generateLink from '../src/helpers/tokens/generate.link';
import status from '../src/helpers/constants/status.codes';
import errors from '../src/helpers/constants/error.messages';

import server from '../src/index';
import mailer from '../src/helpers/Mailer';

chai.use(chaiHttp);
chai.should();

const data = {
  username: 'BurindiAlain',
  email: 'alain@gmail.com',
  password: 'password23423',
};

// The email of the user from the reset password endpoint
let userEmail;

describe('Signup', () => {
  it('should register and give the token', (done) => {
    chai
      .request(server)
      .post('/api/users/signup')
      .send({
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .end((err, res) => {
        res.should.have.status(status.CREATED);
        res.body.should.have.property('user');
        res.body.user.should.have.property('email');
        res.body.user.should.have.property('token');
        res.body.user.should.have.property('username');
        const valid = isTokenValid(res.body.user.token, data);
        valid.should.be.a('boolean').equal(true);
        done();
      });
  });
});

describe('Login', () => {
  it('should login and give a valid token', (done) => {
    chai
      .request(server)
      .post('/api/users/login')
      .send({
        email: data.email,
        password: data.password
      })
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.should.have.property('user');
        res.body.user.should.have.property('email');
        res.body.user.should.have.property('token');
        res.body.user.should.have.property('username');
        const valid = isTokenValid(res.body.user.token, data);
        valid.should.be.a('boolean').equal(true);
        done();
      });
  });

  it('should not login with a wrong password', (done) => {
    chai
      .request(server)
      .post('/api/users/login')
      .send({
        email: data.email,
        password: 'passwor5535'
      })
      .end((err, res) => {
        res.should.have.status(status.UNAUTHORIZED);
        res.body.should.have
          .property('errors')
          .which.has.property('password', errors.incorectPassword);
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
        res.should.have.status(status.NOT_FOUND);
        res.body.should.have.property('errors').which.has.property('email', errors.unkownEmail);
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
    it('it should send an email to the user', (done) => {
      chai
        .request(server)
        .post('/api/password-reset')
        .send({ email: data.email })
        .end((err, res) => {
          res.should.have.status(status.OK);
          done();
        });
    });
    it('it should not send an email when an invalid email addres is provided', (done) => {
      chai
        .request(server)
        .post('/api/password-reset')
        .send({ email: 'email.email' })
        .end((err, res) => {
          res.should.have.status(status.BAD_REQUEST);
          done();
        });
    });
    it('it should not send an email when an unknown email addres is provided', (done) => {
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
    it('it should verify the link sent to the user', (done) => {
      chai
        .request(server)
        .get(`/api/password-reset/${token}`)
        .end((err, res) => {
          res.should.have.status(status.OK);
          userEmail = res.body.data.email;
          done();
        });
    });
    it('it should raise an error when a invalid token is provided', (done) => {
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
    it('it should update the password', (done) => {
      chai
        .request(server)
        .post(`/api/password-reset/update/${userEmail}`)
        .send({ password: 'passWORD123' })
        .end((err, res) => {
          res.should.have.status(status.OK);
          done();
        });
    });
    it('it should login with the new password to confirm that it was changed', (done) => {
      chai
        .request(server)
        .post('/api/users/login')
        .send({
          email: data.email,
          password: 'passWORD123'
        })
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
    it('it should raise an error when an invalid email is provided', (done) => {
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
  it('it should not use an empty body object', (done) => {
    chai
      .request(server)
      .post('/api/password-reset/')
      .send({})
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
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
