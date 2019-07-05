import chai from 'chai';
import '@babel/polyfill';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import status from '../src/helpers/constants/status.codes';
import server from '../src/index';
import signup from '../src/helpers/tests/signup';
import error from '../src/helpers/constants/error.messages';

chai.use(chaiHttp);
chai.should();
dotenv.config();

const userToken = signup();
const Authors = {
  status: 200,
  paginationDetails: {
    pages: 1,
    currentPage: 1,
    pageSize: 2,
    count: 3
  },
  data: [
    { id: 1, username: 'Burindi', email: 'alain1@gmail.com' },
    { id: 41, username: 'dianeMurekatete', email: 'diane@gmail.com' }
  ]
};
describe('get Authors', () => {
  it('should not to verify the token', (done) => {
    const token = '';
    chai
      .request(server)
      .get('/api/authors?offset=0&limit=1')
      .set('Authorization', `${token}`)
      .end((err, res) => {
        res.should.have.status(status.UNAUTHORIZED);
        res.body.should.have.status(status.UNAUTHORIZED);
        res.body.should.have.property('message').eql(error.notAllowed);
        done();
      });
  });

  it('should get all authors', (done) => {
    chai
      .request(server)
      .get('/api/authors?offset=0&limit=10')
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.body.should.have.status(status.OK);
        res.body.should.be.an('object').eql(Authors);
        res.body.data[0].should.include(Authors.data[0]);
        res.body.data[1].should.include(Authors.data[1]);
        done();
      });
  });

  it('should get authors with default offset and limit', (done) => {
    chai
      .request(server)
      .get('/api/authors')
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.data.should.be.an('array').eql(Authors.data);
        res.body.data[0].should.include(Authors.data[0]);
        res.body.data[1].should.include(Authors.data[1]);
        done();
      });
  });
});
