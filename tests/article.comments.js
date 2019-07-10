import chai from 'chai';
import '@babel/polyfill';
import chaiHttp from 'chai-http';
import status from '../src/helpers/constants/status.codes';

import server from '../src/index';

chai.use(chaiHttp);
chai.should();

// The test user
const data = {
  email: 'alain1@gmail.com',
  password: 'password23423'
};

let testUserToken;

describe('Article comments', async () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/users/login')
      .send(data)
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.should.be.an('Object');
        testUserToken = res.body.user.token;
        done();
      });
  });
  it('should add a comment on an article', (done) => {
    chai
      .request(server)
      .post('/api/articles/How-to-create-sequalize-seeds/comments')
      .set('authorization', `${testUserToken}`)
      .send({
        body: "Really interesting article. I've been searching for this"
      })
      .end((err, res) => {
        res.should.have.status(status.CREATED);
        done();
      });
  });
  it('should reply to the comment', (done) => {
    chai
      .request(server)
      .post('/api/articles/How-to-create-sequalize-seeds/comments')
      .set('authorization', `${testUserToken}`)
      .send({
        body: 'alright dude',
        parentCommentId: 1
      })
      .end((err, res) => {
        res.should.have.status(status.CREATED);
        done();
      });
  });
  it('should not reply to a reply', (done) => {
    chai
      .request(server)
      .post('/api/articles/How-to-create-sequalize-seeds/comments')
      .set('authorization', `${testUserToken}`)
      .send({
        body: 'alright dude',
        parentCommentId: 2
      })
      .end((err, res) => {
        res.should.have.status(status.NOT_ALLOWED);
        done();
      });
  });
  it('should not reply to  an nonexisting comment', (done) => {
    chai
      .request(server)
      .post('/api/articles/How-to-create-sequalize-seeds/comments')
      .set('authorization', `${testUserToken}`)
      .send({
        body: 'alright dude',
        parentCommentId: 43
      })
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
  it('should get all the comments of an article', (done) => {
    chai
      .request(server)
      .get('/api/articles/How-to-create-sequalize-seeds/comments?offset=0&&limit=10')
      .set('authorization', `${testUserToken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
  it('should update a comment', (done) => {
    chai
      .request(server)
      .patch('/api/articles/How-to-create-sequalize-seeds/comments/1')
      .set('authorization', `${testUserToken}`)
      .send({
        body: "Really interesting article. I've been searching for this"
      })
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
  it('should delete a comment', (done) => {
    chai
      .request(server)
      .delete('/api/articles/How-to-create-sequalize-seeds/comments/1')
      .set('authorization', `${testUserToken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
  it('should notify when the list is empty', (done) => {
    chai
      .request(server)
      .get('/api/articles/How-to-create-sequalize-seeds/comments?offset=0&&limit=10')
      .set('authorization', `${testUserToken}`)
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
  it('should notify that a comment is not found if it was previously deleted', (done) => {
    chai
      .request(server)
      .delete('/api/articles/How-to-create-sequalize-seeds/comments/1')
      .set('authorization', `${testUserToken}`)
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
});
