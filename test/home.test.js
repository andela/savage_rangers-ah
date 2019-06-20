import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../src/index';
import env from '../src/configs/environments';
import status from '../src/helpers/constants/status.codes';

chai.use(chaiHttp);
chai.should();

describe('Home', () => {
  it('should return the welcome message', (done) => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.should.be.an('Object');
        res.body.should.have.property('data');
        done();
      });
  });
});

describe('environment', () => {
  it('Should show the current environment', () => {
    env.currentEnv.should.be.an('object');
    env.env.should.be.eql('test');
  });
});
