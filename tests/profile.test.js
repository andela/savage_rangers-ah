import '@babel/polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import status from '../src/helpers/constants/status.codes';
import server from '../src/index';
import signup from '../src/helpers/tests/signup';
import errors from '../src/helpers/constants/error.messages';

chai.use(chaiHttp);
chai.should();


const data = {
  country: 'congo',
  firstName: 'alain',
  lastName: 'burindi',
  gender: 'man',
  phoneNumber: '+243974690917',
  address: 'gachinjiro/kigali',
  profileImage: 'noimage.jpg',
  bio: 'I work at statefarm',
  facebook: 'https://facebook.com/alainburindi',
  twitter: 'https://twitter.com/alainburindi',
};

const {
  country, firstName, lastName,
  address, gender, profileImage, phoneNumber, bio
} = data;

const authToken = signup();

describe('Profile', () => {
  it('should update the user\'s profile', (done) => {
    chai.request(server)
      .patch('/api/profiles')
      .set('Authorization', authToken)
      .field({
        country: `${country} Democratic Republic of`,
        firstName,
        lastName,
        bio,
        address,
        gender,
        phoneNumber
      })
      .attach('profileImage', './tests/images/test.jpg', 'test.jpg')
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.should.have.property('message', 'updated correctly');
        done();
      });
  });

  it('should send the user\'s profile', (done) => {
    chai.request(server)
      .get('/api/profiles/Burindi?limit=2&offset=1')
      .set('Authorization', authToken)
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.should.have.property('profile');
        const { profile } = res.body;
        profile.should.have.property('country', `${country} Democratic Republic of`);
        profile.should.have.property('firstName', firstName);
        profile.should.have.property('lastName', lastName);
        profile.should.have.property('address', address);
        profile.should.have.property('gender', gender);
        profile.should.have.property('profileImage');
        profile.should.have.property('phoneNumber', phoneNumber);
        done();
      });
  });
});

describe('Validate data', () => {
  it('should require a token', (done) => {
    chai.request(server)
      .patch('/api/profiles')
      .end((err, res) => {
        res.should.have.status(status.ACCESS_DENIED);
        res.body.should.have.property('message', 'Token is required');
        done();
      });
  });

  it('should unauthenticate if the token is invalid', (done) => {
    chai.request(server)
      .patch('/api/profiles')
      .set('Authorization', 'wrongtoken')
      .end((err, res) => {
        res.should.have.status(status.UNAUTHORIZED);
        res.body.should.have.property('message', 'Authentication failed, please check your credentials');
        done();
      });
  });

  it('should send country error', (done) => {
    chai.request(server)
      .patch('/api/profiles')
      .set('Authorization', authToken)
      .send({
        firstName,
        lastName,
        address,
        bio,
        gender,
        profileImage,
        phoneNumber
      })
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.errors.should.have.property('country', errors.country);
        done();
      });
  });

  it('should send firstName error', (done) => {
    chai.request(server)
      .patch('/api/profiles')
      .set('Authorization', authToken)
      .send({
        country,
        lastName,
        bio,
        address,
        gender,
        profileImage,
        phoneNumber
      })
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.errors.should.have.property('firstName', errors.firstName);
        done();
      });
  });

  it('should send lastName error', (done) => {
    chai.request(server)
      .patch('/api/profiles')
      .set('Authorization', authToken)
      .send({
        country,
        firstName,
        bio,
        address,
        gender,
        profileImage,
        phoneNumber
      })
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.errors.should.have.property('lastName', errors.lastName);
        done();
      });
  });

  it('should send address error', (done) => {
    chai.request(server)
      .patch('/api/profiles')
      .set('Authorization', authToken)
      .send({
        country,
        firstName,
        lastName,
        bio,
        gender,
        profileImage,
        phoneNumber
      })
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.errors.should.have.property('address', errors.address);
        done();
      });
  });

  it('should send gender error', (done) => {
    chai.request(server)
      .patch('/api/profiles')
      .set('Authorization', authToken)
      .send({
        country,
        firstName,
        lastName,
        bio,
        address,
        profileImage,
        phoneNumber
      })
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.errors.should.have.property('gender', errors.gender);
        done();
      });
  });

  it('should send phoneNumber error', (done) => {
    chai.request(server)
      .patch('/api/profiles')
      .set('Authorization', authToken)
      .send({
        country,
        firstName,
        lastName,
        bio,
        address,
        profileImage,
        gender
      })
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.errors.should.have.property('phoneNumber', errors.phoneNumber);
        done();
      });
  });

  it('should send bio error', (done) => {
    chai.request(server)
      .patch('/api/profiles')
      .set('Authorization', authToken)
      .send({
        country,
        firstName,
        lastName,
        address,
        profileImage,
        gender,
        phoneNumber
      })
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.errors.should.have.property('bio', errors.bio);
        done();
      });
  });

  it('should send user\'s not found error', (done) => {
    chai.request(server)
      .get('/api/profiles/wrongname')
      .set('Authorization', authToken)
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        res.body.should.have.property('message', errors.noUser);
        done();
      });
  });
});
