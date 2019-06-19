import chai from 'chai';
import '@babel/polyfill';
import chaiHttp from 'chai-http';
// import isTokenValid from '../src/helpers/tokens/validate.token';
// import generateToken from '../src/helpers/tokens/generate.token';
import status from '../src/helpers/constants/status.codes';
import server from '../src/index';

chai.use(chaiHttp);
chai.should();

describe('deleteArticle', () => {
  it('should delete article', (done) => {
    chai
      .request(server)
      .delete('/api/articles/tyt-uyuy-o')
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });

  it('should fail to delete article', (done) => {
    chai
      .request(server)
      .delete('/api/articles/wer-eer')
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
});
