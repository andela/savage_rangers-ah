import chai from 'chai';
import chaihttp from 'chai-http';

import app from '../src/index';
import env from '../src/configs/environnements';

chai.use(chaihttp);
chai.should();

describe('GET /', () => {
  it('Should return a welcome message', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.data.message.should.be.equal('Welcome on Authors Heaven');
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
