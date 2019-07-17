import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../src/index';
import statusCodes from '../src/helpers/constants/status.codes';

chai.use(chaiHttp);
chai.should();

const { OK } = statusCodes;
const expectedStat = {
  reads: 3,
  shares: 2,
  comments: 0
};

let userToken;

describe('Statistics', () => {
  it('Should send article\'s stat', (done) => {
    chai
      .request(server)
      .get('/api/articles/How-to-create-sequalize-seeds/stats')
      .end((err, res) => {
        res.body.article.stats.should.include(expectedStat);
        done();
      });
  });
  it('Should login an other user', (done) => {
    chai
      .request(server)
      .post('/api/users/login')
      .send({
        email: 'alain44@gmail.com',
        password: 'password23423'
      })
      .end((err, res) => {
        userToken = res.body.user.token;
        done();
      });
  });

  it('Should increase the number of reads', (done) => {
    chai
      .request(server)
      .get('/api/articles/How-to-create-sequalize-seeds')
      .set('Authorization', userToken)
      .end((err, res) => {
        res.should.have.status(OK);
        done();
      });
  });

  it('Should test if the number of reads has increased', (done) => {
    chai
      .request(server)
      .get('/api/articles/How-to-create-sequalize-seeds/stats')
      .end((err, res) => {
        res.body.article.stats.should.include({ reads: 4 });
        done();
      });
  });
});
