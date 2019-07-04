import chai from 'chai';
import chaiHttp from 'chai-http';
import status from '../src/helpers/constants/status.codes';
import server from '../src/index';
import error from '../src/helpers/constants/error.messages';

chai.use(chaiHttp);
chai.should();

let userToken;
describe('deleteArticle', () => {
  it('should fail to verify the token', (done) => {
    const token = '';
    chai
      .request(server)
      .delete('/api/articles/How-to-create-sequalize-seedss')
      .set('Authorization', `${token}`)
      .end((err, res) => {
        res.should.have.status(status.UNAUTHORIZED);
        res.body.should.have.status(status.UNAUTHORIZED);
        res.body.should.have.property('message').eql('Forbiden access');
        done();
      });
  });

  it('should login the user to get the token', (done) => {
    chai
      .request(server)
      .post('/api/users/login')
      .send({
        email: 'alain1@gmail.com',
        password: 'password23423'
      })
      .end((err, res) => {
        res.should.have.status(status.OK);
        userToken = res.body.user.token;
        done();
      });
  });

  it('should fail to delete article', (done) => {
    chai
      .request(server)
      .delete('/api/articles/This-is-it')
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.ACCESS_DENIED);
        res.body.should.have.property('message').eql(error.notOwner);
        done();
      });
  });

  it('should delete article', (done) => {
    chai
      .request(server)
      .delete('/api/articles/How-to-create-sequalize-seedss')
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
});
