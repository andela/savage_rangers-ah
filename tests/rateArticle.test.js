import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import status from '../src/helpers/constants/status.codes';

const { expect } = chai;
chai.use(chaiHttp);
let userToken = '';

describe('test the rating controller', () => {
  it('should login a user and get a token to use against on rating article', (done) => {
    chai
      .request(app)
      .post('/api/users/login')
      .send({
        email: 'alain1@gmail.com',
        password: 'password23423'
      })
      .end((err, res) => {
        userToken = res.body.user.token;
        done();
      });
  });
  it('should not be able to rate an article because it has not found the article slug', (done) => {
    const slug = 'How-to-create-sequalize-ses';
    chai
      .request(app)
      .post(`/api/articles/${slug}/rating`)
      .set('Authorization', userToken)
      .send({
        rating: 5
      })
      .end((err, res) => {
        expect(res.body)
          .to.have.property('errors')
          .eql({ slug: 'Article with slug How-to-create-sequalize-ses is not found, Thanks' });
        done();
      });
  });
  it('should be able to rate an article', (done) => {
    const slug = 'What-is-a-Version-1-UUID';
    const rate = 5;
    chai
      .request(app)
      .post(`/api/articles/${slug}/rating`)
      .set('Authorization', userToken)
      .send({
        rating: rate
      })
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .eql(status.CREATED);
        expect(res.body)
          .to.have.property('message')
          .eql(`Rating for ${slug} submitted successfully`);
        done();
      });
  });

  it('should not be able to rate an article twice', (done) => {
    const slug = 'What-is-a-Version-1-UUID';
    const rate = 5;
    chai
      .request(app)
      .post(`/api/articles/${slug}/rating`)
      .set('Authorization', userToken)
      .send({
        rating: rate
      })
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .eql(status.BAD_REQUEST);
        expect(res.body)
          .to.have.property('errors')
          .to.have.property('Rating')
          .eql('Sorry, you can not update this article twice with the same rating number, please update it');
        done();
      });
  });

  it('should be able to rate an article with an updated input', (done) => {
    const slug = 'What-is-a-Version-1-UUID';
    const rate = 4;
    chai
      .request(app)
      .post(`/api/articles/${slug}/rating`)
      .set('Authorization', userToken)
      .send({
        rating: rate
      })
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .eql(status.OK);
        expect(res.body)
          .to.have.property('message')
          .eql(`You have successfully updated your Ratings for ${slug}`);
        done();
      });
  });
});
