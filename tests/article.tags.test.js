import chai from 'chai';
import '@babel/polyfill';
import chaiHttp from 'chai-http';
import status from '../src/helpers/constants/status.codes';
import env from '../src/configs/environments';

import server from '../src/index';

chai.use(chaiHttp);
chai.should();

// The test user
const data = {
  username: 'BurindiAlain654634',
  email: 'alain5445665@gmail.com',
  password: 'password23423',
  confirmPassword: 'password23423'
};

let testUserToken;

describe('Article tags', async () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/users/signup')
      .send(data)
      .end((err, res) => {
        res.should.have.status(status.CREATED);
        res.body.should.be.an('Object');
        testUserToken = res.body.user.token;
        done();
      });
  });
  it('should add a tag to an article', (done) => {
    chai
      .request(server)
      .patch('/api/articles/How-to-create-sequalize-seeds/tags')
      .set('Authorization', `Bearer ${env.userToken}`)
      .send({
        tag: 'Music'
      })
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });

  it('should not add a tag if the token is invalid', (done) => {
    chai
      .request(server)
      .patch('/api/articles/How-to-create-sequalize-seeds/tags')
      .set('Authorization', `Bearer d${env.userToken}`)
      .send({
        tag: 'Music'
      })
      .end((err, res) => {
        res.should.have.status(status.UNAUTHORIZED);
        done();
      });
  });
  it('should not add a tagg when the user is not the owner', (done) => {
    chai
      .request(server)
      .patch('/api/articles/How-to-create-sequalize-seeds/tags')
      .set('Authorization', `Bearer ${testUserToken}`)
      .send({
        tag: 'Musics'
      })
      .end((err, res) => {
        res.should.have.status(status.ACCESS_DENIED);
        done();
      });
  });
  it('should not add a tagg when the slug is invalid', (done) => {
    chai
      .request(server)
      .patch('/api/articles/How-to-create-sequalize-seedss/tags')
      .set('Authorization', `Bearer ${testUserToken}`)
      .send({
        tag: 'Musics'
      })
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
  it('Should not be done by an unauthorized user', (done) => {
    chai
      .request(server)
      .patch('/api/articles/How-to-create-sequalize-seedss/tags')
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        done();
      });
  });
});

describe('Body validator', () => {
  it('Should nuse joi errors', (done) => {
    chai
      .request(server)
      .patch('/api/tests/bodyInputsValidator')
      .send({})
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        done();
      });
  });
});
