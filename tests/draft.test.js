import '@babel/polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import status from '../src/helpers/constants/status.codes';
import server from '../src/index';
import signup from '../src/helpers/tests/signup';
import errors from '../src/helpers/constants/error.messages';

chai.use(chaiHttp);
chai.should();

const { OK, BAD_REQUEST } = status;
const authToken = signup();
let draftedSlug;
describe('Drafting', () => {
  it('should publish an article', (done) => {
    chai
      .request(server)
      .patch('/api/articles/Test-draft-22khdb/publish')
      .set('Authorization', authToken)
      .end((err, res) => {
        res.should.have.status(OK);
        res.body.should.have.property('message', 'Your article has been published successfully');
        done();
      });
  });
  it('should not publish an article with missing property', (done) => {
    chai
      .request(server)
      .post('/api/articles')
      .set('Authorization', authToken)
      .send({ title: 'this is for test', body: 'herpiyfbeurg  rihgf', tags: [] })
      .end((err, res) => {
        draftedSlug = res.body.article.slug;
        chai
          .request(server)
          .patch(`/api/articles/${draftedSlug}/publish`)
          .set('Authorization', authToken)
          .end((err, res) => {
            res.should.have.status(BAD_REQUEST);
            res.body.errors.should.have.property('Properties', errors.missingProperty);
          });
        done();
      });
  });

  it('should send users drafted articles', (done) => {
    chai
      .request(server)
      .get('/api/articles/drafts')
      .set('Authorization', authToken)
      .end((err, res) => {
        res.should.have.status(OK);
        done();
      });
  });
});
