import chai from 'chai';
import chaihttp from 'chai-http';
import server from '../src';
import status from '../src/helpers/constants/status.codes';

chai.use(chaihttp);

chai.should();

describe('GET category', () => {
  it('should return list of categories', (done) => {
    chai
      .request(server)
      .get('/api/categories')
      .end((err, res) => {
        res.body.should.have.status(status.OK);
        res.body.categories.should.be.an('array');
        res.body.categories[0].name.should.be.eq('LOVE');
        done();
      });
  });
});
