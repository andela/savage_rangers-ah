import chai from 'chai';
import '@babel/polyfill';
import chaiHttp from 'chai-http';
import isTokenValid from '../src/helpers/tokens/validate.token';
import generateToken from '../src/helpers/tokens/generate.token';
import generateLink from '../src/helpers/tokens/generate.link';

import server from '../src/index';
import Mailer from '../src/helpers/Mailer';

chai.use(chaiHttp);
chai.should();

const data = {
  username: 'Burindi Alain',
  email: 'premices.tuvere@gmail.com',
  password: 'password'
};

// The email of the user from the reset password endpoint
let userEmail;

describe('Signup', () => {
  it('should register and give the token', (done) => {
    chai
      .request(server)
      .post('/api/auth/signup')
      .send({
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.password
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('user');
        res.body.user.should.have.property('email');
        res.body.should.have.property('token');
        res.body.user.should.have.property('username');
        const valid = isTokenValid(res.body.user.token, data);
        valid.should.be.a('boolean').equal(false);
        done();
      });
  });
});

describe('Login', () => {
  it('should login and give a valid token', (done) => {
    chai
      .request(server)
      .post('/api/auth/login')
      .send({
        email: data.email,
        password: data.password
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('user');
        res.body.user.should.have.property('email');
        res.body.should.have.property('token');
        res.body.user.should.have.property('username');
        const valid = isTokenValid(res.body.user.token, data);
        valid.should.be.a('boolean').equal(false);
        done();
      });
  });

  it('should not login with a wrong password', (done) => {
    chai
      .request(server)
      .post('/api/auth/login')
      .send({
        email: data.email,
        password: 'passwor5535'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message', 'Invalid email or password');
        done();
      });
  });

  it('should not login an unexisting user', (done) => {
    chai
      .request(server)
      .post('/api/auth/login')
      .send({
        email: 'alain666326@gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message', "User doesn't exist");
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
          res.should.have.status(200);
          done();
        });
    });
    it('it should not send an email when an invalid email addres is provided', (done) => {
      chai
        .request(server)
        .post('/api/password-reset')
        .send({ email: 'email.email' })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('it should not send an email when an unknown email addres is provided', (done) => {
      chai
        .request(server)
        .post('/api/password-reset')
        .send({ email: 'email@email.com' })
        .end((err, res) => {
          res.should.have.status(404);
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
          res.should.have.status(200);
          userEmail = res.body.data.email;
          done();
        });
    });
    it('it should raise an error when a invalid token is provided', (done) => {
      chai
        .request(server)
        .get('/api/password-reset/sdfgfhsdgfe')
        .end((err, res) => {
          res.should.have.status(400);
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
          res.should.have.status(200);
          done();
        });
    });
    it('it should login with the new password to confirm that it was changed', (done) => {
      chai
        .request(server)
        .post('/api/auth/login')
        .send({
          email: data.email,
          password: 'passWORD123'
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('it should raise an error when an unknown email is provided', (done) => {
      chai
        .request(server)
        .post('/api/password-reset/update/email@gmail.com')
        .send({ password: 'passWORD123' })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it('it should raise an error when an invalid email is provided', (done) => {
      chai
        .request(server)
        .post('/api/password-reset/update/email@gmai')
        .send({ password: 'passWORD123' })
        .end((err, res) => {
          res.should.have.status(400);
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
        res.should.have.status(400);
        done();
      });
  });
});

describe('Mailer', async () => {
  it('should execute without params', async () => {
    const test = await Mailer();
    test.should.be.a('Error');
  });

  it('should execute with one param', async () => {
    await Mailer('title', 'subject', 'reciever@example.com', 'notifications', {});
  });
});
