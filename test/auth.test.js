import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import models from '../src/api/models/index';
import isTokenValid from '../src/helpers/tokens/validate.token';
import generateToken from '../src/helpers/tokens/generate.token';


import server from '../src/index';

chai.use(chaiHttp);
chai.should();

const data = {
  username: 'alain',
  email: 'alain@gmail.com',
  password: 'diane3456',
  confirmPassword: 'diane3456'
};

describe('Signup', () => {
  it('should register and give the token', (done) => {
    chai.request(server)
      .post('/api/users/signup')
      .send({
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.password,
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('user');
        res.body.user.should.have.property('email', data.email);
        res.body.user.should.have.property('token');
        res.body.user.should.have.property('username', data.username);
        const valid = isTokenValid(res.body.user.token, data);
        valid.should.be.a('boolean').equal(true);
        done();
      });
  });
});

describe('Login', () => {
  it('should login and give a valid token', (done) => {
    chai.request(server)
      .post('/api/users/login')
      .send({
        email: data.email,
        password: data.password,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('user');
        res.body.user.should.have.property('email', data.email);
        res.body.user.should.have.property('token');
        res.body.user.should.have.property('username', data.username);
        const valid = isTokenValid(res.body.user.token, data);
        valid.should.be.a('boolean').equal(true);
        done();
      });
  });

  it('should not login with a wrong password', (done) => {
    chai.request(server)
      .post('/api/users/login')
      .send({
        email: data.email,
        password: 'passwor5535',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message', 'password is incorrect');
        done();
      });
  });

  it('should not login an unexisting user', (done) => {
    chai.request(server)
      .post('/api/users/login')
      .send({
        email: 'alain666326@gmail.com',
        password: 'password',
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message', 'user doesn\'t exist');
        done();
      });
  });

  it('Should verify the token', () => {
    const verify = generateToken('user');
    console.log(verify);
  });
});

describe('Model', () => {
  it('should return an object', (done) => {
    models.should.be.an('Object');
    models.User.truncate({ cascade: true });
    models.Token.truncate({ cascade: true });
    done();
  });
});

describe('Validation', () => {
  it('should return false if the token is wrong', (done) => {
    const valid = isTokenValid('wrongtoken', data);
    valid.should.be.a('boolean').equal(false);
    done();
  });
});
