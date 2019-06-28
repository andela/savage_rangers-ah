import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import slugMaker from '../src/helpers/slug.maker';
import statuses from '../src/helpers/constants/status.codes';

const { expect } = chai;
chai.use(chaiHttp);
let UserToken = '';

describe('testing the middlewares before reaching the update article controller', () => {
  it('should signup a user to be checking against', (done) => {
    chai
      .request(app)
      .post('/api/users/signup')
      .send({
        username: 'Danny',
        email: 'DannyMwangila23@gmail.com',
        password: 'MUfra123qwe'
      })
      .end((err, res) => {
        UserToken = res.body.user.token;
        done();
      });
  });
  it('should login a user and get a token to use against', (done) => {
    chai
      .request(app)
      .post('/api/users/login')
      .send({
        email: 'DannyMwangila23@gmail.com',
        password: 'MUfra123qwe'
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
      .set('Authorization', UserToken)
      .send({
        tagList: ['Yoga', 'Health']
      })
      .end((err, res) => {
        expect(res.status).eql(statuses.NOT_FOUND);
        expect(res.body)
          .to.have.property('message')
          .eql(`Article with this ${slug} is not found, Thanks`);
        done();
      });
  });

  it('should check for the article ownership', (done) => {
    const slug = 'How-to-create-sequalize-seeds';
    chai
      .request(app)
      .patch(`/api/articles/${slug}`)
      .set('Authorization', UserToken)
      .send({
        tagList: ['sequelize', 'postgres', 'controllers']
      })
      .end((err, res) => {
        expect(res.status).eql(statuses.ACCESS_DENIED);
        expect(res.body)
          .to.have.property('message')
          .eql('Please you must be the owner of this Article in order to modify it, Thanks');
        done();
      });
  });

  it('should check for the slug maker', (done) => {
    const title = 'meditate about yourself';
    const slugWord = slugMaker(title);
    expect(slugWord)
      .to.be.a('string')
      .eql(slugWord);
    done();
  });
});

describe('testing testing testing and testing for the article update controller', () => {
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
    chai
      .request(app)
      .patch(`/api/articles/${slug}`)
      .set('Authorization', UserToken)
      .field({
        tagList: ['sequelize', 'postgres', 'controllers']
      })
      .attach('coverImage', './tests/images/eric.jpg', 'eric.jpg')
      .end((err, res) => {
        expect(res.status).eql(statuses.OK);
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
      .set('Authorization', UserToken)
      .send({
        tagList: ''
      })
      .end((err, res) => {
        expect(res.status).eql(statuses.OK);
        expect(res.body)
          .to.have.property('message')
          .eql('Your Article is up-to-date now, Thanks');
        done();
      });
  });
});
