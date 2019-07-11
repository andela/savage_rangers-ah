import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../src/index';
import statusCodes from '../src/helpers/constants/status.codes';
import signup from '../src/helpers/tests/signup';
import errorMessage from '../src/helpers/constants/error.messages';


chai.use(chaiHttp);
chai.should();

const {
  CREATED, BAD_REQUEST, OK, NOT_FOUND
} = statusCodes;
const highlitedData = {
  startIndex: 3,
  lastIndex: 8,
  text: 'text g',
  comment: 'is correct'
};

const token = signup();
describe('Highlight', () => {
  it('should highlight a text', (done) => {
    chai
      .request(server)
      .post('/api/articles/How-to-create-sequalize-seeds/highlight')
      .set('Authorization', token)
      .send({
        ...highlitedData
      })
      .end((err, res) => {
        res.should.have.status(CREATED);
        res.body.highlighted.should.include(highlitedData);
        done();
      });
  });

  it('should send highlighted text', (done) => {
    chai
      .request(server)
      .get('/api/articles/How-to-create-sequalize-seeds/highlight')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(OK);
        res.body.highlighted[0].should.include(highlitedData);
        done();
      });
  });

  it('should send no highlighted error', (done) => {
    chai
      .request(server)
      .get('/api/articles/What-is-a-Version-1-UUID/highlight')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(NOT_FOUND);
        res.body.errors.should.have.property('highlited', errorMessage.noHighlight);
        done();
      });
  });
  describe('Validation', () => {
    it('the text length should match the indexes', (done) => {
      highlitedData.startIndex = 2;
      chai
        .request(server)
        .post('/api/articles/How-to-create-sequalize-seeds/highlight')
        .set('Authorization', token)
        .send({
          ...highlitedData
        })
        .end((err, res) => {
          res.should.have.status(BAD_REQUEST);
          res.body.errors.should.have.property('text', errorMessage.textMatch);
          done();
        });
    });
  });
});
