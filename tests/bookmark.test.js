import chai from 'chai';
import chaihttp from 'chai-http';
import chaithings from 'chai-things';
import chailike from 'chai-like';
import server from '../src/index';
import status from '../src/helpers/constants/status.codes';
import errorMessage from '../src/helpers/constants/error.messages';
import model from '../src/api/models/index';

const { Bookmark } = model;

chai.use(chaihttp);
chai.use(chaithings);
chai.use(chailike);
chai.should();
let UserToken;
let loginToken;

describe('POST /api/bookmarks/:slug', () => {
  it('should signup a user to be checking against', (done) => {
    chai
      .request(server)
      .post('/api/users/login')
      .send({
        email: 'alain2@gmail.com',
        password: 'password23423'
      })
      .end((err, res) => {
        UserToken = res.body.user.token;
        done();
      });
  });
  it('should respond with a success message after bookmarking', (done) => {
    chai
      .request(server)
      .post('/api/bookmarks/What-is-a-Version-1-UUID')
      .set('Authorization', `${UserToken}`)
      .end((err, res) => {
        res.should.have.status(status.CREATED);
        res.body.message.should.be.eq('Bookmarked successfully');
        done();
      });
  });

  it('should remove the bookmark if the user send the request again', (done) => {
    chai
      .request(server)
      .post('/api/bookmarks/What-is-a-Version-1-UUID')
      .set('Authorization', `${UserToken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.message.should.be.eq('Successfully removed bookmark');
        done();
      });
  });
  it('should return a message if the slug is wrong', (done) => {
    chai
      .request(server)
      .post('/api/bookmarks/What-is-a-Version-1-UUIDs')
      .set('Authorization', `${UserToken}`)
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        res.body.errors.Slug.should.be.eq(errorMessage.noSlug);
        done();
      });
  });
});

describe('GET /api/bookmarks', () => {
  it('login user', (done) => {
    chai
      .request(server)
      .post('/api/users/login')
      .send({
        email: 'alain2@gmail.com',
        password: 'password23423'
      })
      .end((err, res) => {
        loginToken = res.body.user.token;
        done();
      });
  });
  it('Should return a list of bookmarked articles', (done) => {
    chai
      .request(server)
      .get('/api/bookmarks/')
      .set('Authorization', `${loginToken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.data.bookmarks.should.be.an('Array');
        res.body.data.bookmarks.should.contain.something.like({
          articleSlug: 'How-to-create-sequalize-seedss',
          Article: {
            id: 2,
            title: 'How to create sequalize seedss',
            description: 'How to set dummy data automaticallyy',
            User: {
              firstName: 'Alain',
              lastName: 'Burindi',
              profileImage: 'defaultAvatar.jpg'
            },
            Category: {
              name: 'LOVE'
            }
          }
        });

        done();
      });
  });
  it('Should return a message if there is no bookmarks', (done) => {
    Bookmark.truncate({ cascade: true });
    chai
      .request(server)
      .get('/api/bookmarks/')
      .set('Authorization', `${loginToken}`)
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        res.body.errors.Bookmark.should.be.eq(errorMessage.noBookmark);
        done();
      });
  });
});
