import chai from 'chai';
import '@babel/polyfill';
import chaiHttp from 'chai-http';
import status from '../src/helpers/constants/status.codes';

import server from '../src/index';

chai.use(chaiHttp);
chai.should();

const dataUsage = {
  email: 'alain1@gmail.com',
  password: 'password23423'
};

let testUserToken;

describe('popular articles', async () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/users/login')
      .send(dataUsage)
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.should.be.an('Object');
        testUserToken = res.body.user.token;
        done();
      });
  });
  it('should get all the popular articles', (done) => {
    chai
      .request(server)
      .get('/api/articles/popular')
      .set('authorization', `${testUserToken}`)
      .end((err, res) => {
        const { data } = res.body;
        res.should.have.status(status.OK);
        res.body.should.have.property('data').to.be.an('array');
        data[0].should.have
          .property('title')
          .equal('How to create sequalize seeds');
        data[0].should.have
          .property('slug')
          .equal('How-to-create-sequalize-seeds');
        data[0].should.have
          .property('description')
          .equal('How to set dummy data automatically');
        data[0].should.have.property('coverImage').equal('default.jpeg');
        data[0].should.have.property('category').equal('LOVE');
        done();
      });
  });
});
