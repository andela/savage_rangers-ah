import '@babel/polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../src/index';

chai.use(chaiHttp);
chai.should();


const data = {
  country: 'congo',
  firstName: 'alain',
  lastName: 'burindi',
  gender: 'man',
  phoneNumber: '+243974690917',
  address: 'gachinjiro/kigali',
  avatar: 'noimage.jpg',
  bio: 'I work at statefarm',
  facebook: 'https://facebook.com/alainburindi',
  twitter: 'https://twitter.com/alainburindi',
};

const errors = {
  country: 'The country is required should only contain alphanumeric characters',
  firstName: 'The firstName should only contain alphanumeric characters',
  lastName: 'The lastName should only contain alphanumeric characters',
  address: 'The address is required',
  gender: 'The gender should only contain alphanumeric characters',
  phoneNumber: 'The phone number is required',
  bio: 'The bio is required',
  user: 'User doesn\'t exist',
};

const userData = {
  username: 'myname',
  email: 'myname@mail.com',
  password: 'data.password111',
  confirmPassword: 'data.password111',
};

const {
  country, firstName, lastName,
  address, gender, avatar, phoneNumber, bio
} = data;

let authToken = '';

describe('Profile', () => {
  it('should signup to get the token', (done) => {
    chai.request(server)
      .post('/api/users/signup')
      .send({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
      })
      .end((err, res) => {
        authToken = res.body.user.token;
        done();
      });
  });

  it('should update the user\'s profile', (done) => {
    chai.request(server)
      .patch('/api/auth/profile')
      .set('Authorization', authToken)
      .send({
        country: `${country} Democratic Republic of`,
        firstName,
        lastName,
        bio,
        address,
        gender,
        avatar,
        phoneNumber
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'updated correctly');
        done();
      });
  });

  it('should send the user\'s profile', (done) => {
    chai.request(server)
      .get('/api/auth/profile')
      .set('Authorization', authToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('profile');
        const { profile } = res.body;
        profile.should.have.property('email', userData.email);
        profile.should.have.property('username', userData.username);
        profile.should.have.property('country', `${country} Democratic Republic of`);
        profile.should.have.property('firstName', firstName);
        profile.should.have.property('lastName', lastName);
        profile.should.have.property('address', address);
        profile.should.have.property('gender', gender);
        profile.should.have.property('avatar', avatar);
        profile.should.have.property('phoneNumber', phoneNumber);
        done();
      });
  });

  it('should send another user\'s profile', (done) => {
    chai.request(server)
      .get(`/api/auth/profile/${userData.username}`)
      .set('Authorization', authToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('profile');
        const { profile } = res.body;
        profile.should.have.property('email', userData.email);
        profile.should.have.property('username', userData.username);
        profile.should.have.property('country', `${country} Democratic Republic of`);
        profile.should.have.property('firstName', firstName);
        profile.should.have.property('lastName', lastName);
        profile.should.have.property('address', address);
        profile.should.have.property('gender', gender);
        profile.should.have.property('avatar', avatar);
        profile.should.have.property('phoneNumber', phoneNumber);
        done();
      });
  });
});

describe('Validate data', () => {
  it('should require a token', (done) => {
    chai.request(server)
      .patch('/api/auth/profile')
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('message', 'Token is required');
        done();
      });
  });

  it('should unauthenticate if the token is invalid', (done) => {
    chai.request(server)
      .patch('/api/auth/profile')
      .set('Authorization', 'wrongtoken')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message', 'Authentication failed, please check your credentials');
        done();
      });
  });

  it('should send country error', (done) => {
    chai.request(server)
      .patch('/api/auth/profile')
      .set('Authorization', authToken)
      .send({
        firstName,
        lastName,
        address,
        bio,
        gender,
        avatar,
        phoneNumber
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message', errors.country);
        done();
      });
  });

  it('should send firstName error', (done) => {
    chai.request(server)
      .patch('/api/auth/profile')
      .set('Authorization', authToken)
      .send({
        country,
        lastName,
        bio,
        address,
        gender,
        avatar,
        phoneNumber
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message', errors.firstName);
        done();
      });
  });

  it('should send lastName error', (done) => {
    chai.request(server)
      .patch('/api/auth/profile')
      .set('Authorization', authToken)
      .send({
        country,
        firstName,
        bio,
        address,
        gender,
        avatar,
        phoneNumber
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message', errors.lastName);
        done();
      });
  });

  it('should send address error', (done) => {
    chai.request(server)
      .patch('/api/auth/profile')
      .set('Authorization', authToken)
      .send({
        country,
        firstName,
        lastName,
        bio,
        gender,
        avatar,
        phoneNumber
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message', errors.address);
        done();
      });
  });

  it('should send gender error', (done) => {
    chai.request(server)
      .patch('/api/auth/profile')
      .set('Authorization', authToken)
      .send({
        country,
        firstName,
        lastName,
        bio,
        address,
        avatar,
        phoneNumber
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message', errors.gender);
        done();
      });
  });

  it('should send phoneNumber error', (done) => {
    chai.request(server)
      .patch('/api/auth/profile')
      .set('Authorization', authToken)
      .send({
        country,
        firstName,
        lastName,
        bio,
        address,
        avatar,
        gender
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message', errors.phoneNumber);
        done();
      });
  });

  it('should send bio error', (done) => {
    chai.request(server)
      .patch('/api/auth/profile')
      .set('Authorization', authToken)
      .send({
        country,
        firstName,
        lastName,
        address,
        avatar,
        gender,
        phoneNumber
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message', errors.bio);
        done();
      });
  });

  it('should user\'s not found error', (done) => {
    chai.request(server)
      .get('/api/auth/profile/wrongname')
      .set('Authorization', authToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message', errors.user);
        done();
      });
  });
});
