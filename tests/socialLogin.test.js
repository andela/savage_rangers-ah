import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/index';

chai.use(chaiHttp);

describe('Signup || Login', () => {
  it('should login with facebook ', (done) => {
    chai
      .request(server)
      .post('/api/users/mockFacebook')
      .send({
        id: '1579056305559555',
        provider: 'facebook'
      })
      .end(() => {
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
      .end(() => {
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
      .end(() => {
        done();
      });
  });
});
