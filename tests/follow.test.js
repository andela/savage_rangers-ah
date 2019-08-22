import chai from 'chai';
import chaihttp from 'chai-http';
import chaithing from 'chai-things';
import chailike from 'chai-like';
import server from '../src/index';
import status from '../src/helpers/constants/status.codes';
import errorMessage from '../src/helpers/constants/error.messages';

chai.use(chaihttp);
chai.use(chaithing);
chai.use(chailike);
chai.should();
let UserToken;
let followToken;

describe('POST /api/profiles/:username/follow', () => {
  it('login a user to get token', (done) => {
    chai
      .request(server)
      .post('/api/users/login')
      .send({
        email: 'alain25@gmail.com',
        password: 'password23423'
      })
      .end((err, res) => {
        UserToken = res.body.user.token;
        done();
      });
  });
  it('Should return a message on successful follow', (done) => {
    chai
      .request(server)
      .post('/api/profiles/daniel/follow')
      .set('Authorization', `${UserToken}`)
      .send()
      .end((err, res) => {
        res.body.should.have.status(status.CREATED);
        res.body.message.should.be.eq('You are now following daniel');
        done();
      });
  });
  it('Should prevent a user from following himself', (done) => {
    chai
      .request(server)
      .post('/api/profiles/BurindiAlain25/follow')
      .set('Authorization', `${UserToken}`)
      .send()
      .end((err, res) => {
        res.body.should.have.status(status.ACCESS_DENIED);
        res.body.errors.User.should.be.eq(errorMessage.followError);
        done();
      });
  });
  it('Should  inform the user of a repeatitive follow', (done) => {
    chai
      .request(server)
      .post('/api/profiles/daniel/follow')
      .set('Authorization', `${UserToken}`)
      .send()
      .end((err, res) => {
        res.body.should.have.status(status.BAD_REQUEST);
        res.body.errors.follow.should.be.eq('Already following daniel');
        done();
      });
  });
});

describe('DELETE /api/profiles/:username/unfollow', () => {
  it('Should return a message on successful unfollow', (done) => {
    chai
      .request(server)
      .delete('/api/profiles/daniel/unfollow')
      .set('Authorization', `${UserToken}`)
      .send()
      .end((err, res) => {
        res.body.should.have.status(status.OK);
        res.body.message.should.be.eq('Successfully unfollowed daniel');
        done();
      });
  });
  it('Should inform the user of a repeatitive unfollow', (done) => {
    chai
      .request(server)
      .delete('/api/profiles/daniel/unfollow')
      .set('Authorization', `${UserToken}`)
      .send()
      .end((err, res) => {
        res.body.should.have.status(status.NOT_FOUND);
        res.body.errors.user.should.be.eq('You are not following daniel');
        done();
      });
  });
});

describe('GET /api/profiles/follower', () => {
  it('login and get token', (done) => {
    chai
      .request(server)
      .post('/api/users/login')
      .send({
        email: 'alain2@gmail.com',
        password: 'password23423'
      })
      .end((err, res) => {
        followToken = res.body.user.token;
        done();
      });
  });
  it('Should return a list of followers', (done) => {
    chai
      .request(server)
      .get('/api/profiles/follower')
      .set('Authorization', `${followToken}`)
      .end((err, res) => {
        res.body.should.have.status(status.OK);
        res.body.data.followers.should.be.an('Array');
        res.body.data.followers.should.contain.something.like({
          follower: 'BurindiAlain44',
          profileImage: null
        });
        done();
      });
  });
  it('Should return a message if the user has no follower', (done) => {
    chai
      .request(server)
      .get('/api/profiles/follower')
      .set('Authorization', `${UserToken}`)
      .end((err, res) => {
        res.body.should.have.status(status.NOT_FOUND);
        res.body.errors.follower.should.eq(errorMessage.followerError);
        done();
      });
  });
});

describe('GET /api/profiles/following', () => {
  it('login and get token', (done) => {
    chai
      .request(server)
      .post('/api/users/login')
      .send({
        email: 'alain2@gmail.com',
        password: 'password23423'
      })
      .end((err, res) => {
        followToken = res.body.user.token;
        done();
      });
  });
  it('Should return a list of followed users', (done) => {
    chai
      .request(server)
      .get('/api/profiles/following')
      .set('Authorization', `${followToken}`)
      .end((err, res) => {
        res.body.should.have.status(status.OK);
        res.body.data.following.should.be.an('Array');
        res.body.data.following.should.contain.something.like({
          following: 'Burindi',
          profileImage: null
        });
        done();
      });
  });
  it('Should return a message if the user is following  no one', (done) => {
    chai
      .request(server)
      .get('/api/profiles/following')
      .set('Authorization', `${UserToken}`)
      .end((err, res) => {
        res.body.should.have.status(status.NOT_FOUND);
        res.body.errors.following.should.eq(errorMessage.followingError);
        done();
      });
  });
});
