import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/index';
import db from '../src/api/models/index';
import status from '../src/helpers/constants/status.codes';

const { User, Token } = db;
chai.use(chaiHttp);

describe('Signup || Login', () => {
  it('should login with facebook ', (done) => {
    User.truncate({ cascade: true });
    Token.truncate({ cascade: true });
    chai
      .request(server)
      .post('/api/users/mockFacebook')
      .send({
        id: '1579056305559555',
        provider: 'facebook'
      })
      .end((err, res) => {
        res.should.have.status(status.CREATED);
        res.body.should.be.an('object');
        res.body.user.should.have.property('provider').eql('facebook');
        res.body.user.should.have.property('uniqueId').eql('1579056305559555');
        res.body.user.should.have.property('username').eql('Ramadhan');
        res.body.user.should.have.property('token');
        done();
      });
  });

  it('should login with google ', (done) => {
    chai
      .request(server)
      .post('/api/users/mockGoogle')
      .send({
        id: '15790563055596',
        provider: 'google'
      })
      .end((err, res) => {
        res.should.have.status(status.CREATED);
        res.body.should.be.an('object');
        res.body.user.should.have.property('token');
        done();
      });
  });

  it('should login with twitter ', (done) => {
    chai
      .request(server)
      .post('/api/users/mockTwitter')
      .send({
        id: '15790563055533',
        provider: 'twiter'
      })
      .end((err, res) => {
        res.should.have.status(status.CREATED);
        res.body.should.be.an('object');
        res.body.user.should.have.property('token');
        done();
      });
  });
});
