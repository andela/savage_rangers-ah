import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import status from '../src/helpers/constants/status.codes';

const { expect } = chai;
chai.use(chaiHttp);
let UserToken;

describe('testing the middlewares before reaching the update article controller', () => {
  it('should signup a user to be checking against', (done) => {
    chai
      .request(app)
      .post('/api/users/login')
      .send({
        email: 'alain1@gmail.com',
        password: 'password23423'
      })
      .end((err, res) => {
        UserToken = res.body.user.token;
        done();
      });
  });
  it('should check if the article is not found', (done) => {
    const slug = 'meditate-about-yourself';
    chai
      .request(app)
      .patch(`/api/articles/${slug}`)
      .set('authorization', UserToken)
      .send({
        body: ['how did the classical Latin become']
      })
      .end((err, res) => {
        expect(res.status).eql(status.NOT_FOUND);
        expect(res.body)
          .to.have.property('errors')
          .eql({
            slug:
              'Article with slug meditate-about-yourself is not found, Thanks'
          });
        done();
      });
  });
  it('get the token', (done) => {
    chai
      .request(app)
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
  it('should check for the article ownership', (done) => {
    const slug = 'How-to-create-sequalize-seeds';
    chai
      .request(app)
      .patch(`/api/articles/${slug}`)
      .set('authorization', UserToken)
      .send({
        body: 'how did the classical Latin become',
        tags: ['Laravel', 'php', 'IOT', 'iot2']
      })
      .end((err, res) => {
        expect(res.status).eql(status.ACCESS_DENIED);
        expect(res.body)
          .to.have.property('message')
          .eql('Please you must be the owner of this Article in order to modify it, Thanks');
        done();
      });
  });
});

describe('testing for the article update controller', () => {
  it('should login a user and get a token to use against', (done) => {
    chai
      .request(app)
      .post('/api/users/login')
      .send({
        email: 'alain1@gmail.com',
        password: 'password23423'
      })
      .end((err, res) => {
        UserToken = res.body.user.token;
        done();
      });
  });
  it('should update the article with new content', (done) => {
    const slug = 'How-to-create-sequalize-seeds';
    const updatedArticle = {
      title: 'lets try to update',
      dscription: "If we can't test we cant progress",
      body: 'how did the classical Latin become',
      tags: ['Laravel', 'php', 'IOT', 'iot2'],
      coverImage: 'http://localhost:3000/ver.jpg',
      category: 2
    };

    chai
      .request(app)
      .patch(`/api/articles/${slug}`)
      .set('authorization', UserToken)
      .send(updatedArticle)
      .end((err, res) => {
        expect(res.status).eql(status.OK);
        expect(res.body)
          .to.have.property('message')
          .eql('Your Article is up-to-date now, Thanks');
        done();
      });
  });

  it('should update the article with existing content', (done) => {
    const slug = 'What-is-a-Version-1-UUID';
    chai
      .request(app)
      .patch(`/api/articles/${slug}`)
      .set('authorization', UserToken)
      .send({
        body: '',
        tags: ['Laravel', 'php', 'IOT', 'iot2']
      })
      .end((err, res) => {
        expect(res.status).eql(status.OK);
        expect(res.body)
          .to.have.property('message')
          .eql('Your Article is up-to-date now, Thanks');
        done();
      });
  });
});
