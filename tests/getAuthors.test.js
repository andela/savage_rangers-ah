import chai from 'chai';
import '@babel/polyfill';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import status from '../src/helpers/constants/status.codes';
import server from '../src/index';

chai.use(chaiHttp);
chai.should();
dotenv.config();

let userToken;

describe('get Authors', () => {
  it('should fail to verify the token', (done) => {
    const token = '';
    chai
      .request(server)
      .get('/api/authors?offset=0&limit=1')
      .set('Authorization', `${token}`)
      .end((err, res) => {
        res.should.have.status(status.UNAUTHORIZED);
        res.body.should.have.status(status.UNAUTHORIZED);
        res.body.should.have.property('message').eql('Forbiden access');
        done();
      });
  });

  it('should login the user to get the token', (done) => {
    chai
      .request(server)
      .post('/api/users/login')
      .send({
        email: 'alain1@gmail.com',
        password: 'password23423'
      })
      .end((err, res) => {
        res.should.have.status(status.OK);
        userToken = res.body.user.token;
        done();
      });
  });

  it('should get all authors', (done) => {
    chai
      .request(server)
      .get('/api/authors')
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.body.should.have.status(status.OK);
        res.body.should.be.an('object');
        res.body.data[0].should.have.property('email').eql('alain1@gmail.com');
        res.body.data[1].should.have.property('email').eql('diane@gmail.com');
        done();
      });
  });

  it('should fail to get authors', (done) => {
    chai
      .request(server)
      .get('/api/author')
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
});
