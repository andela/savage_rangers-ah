import chai from 'chai';
import '@babel/polyfill';
import chaiHttp from 'chai-http';
import statusCode from '../src/helpers/constants/status.codes';
import errorMessages from '../src/helpers/constants/error.messages';
import server from '../src/index';

chai.use(chaiHttp);
chai.should();
let userToken = '';

const { expect } = chai;
const fakeArticle = {
  title: 'So how did the classical Latin become so incoherent? According to McClintock',
  description:
    ' how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part o',
  body:
    'po how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Ciceros De Finibus in order to provide placeholder text to mockup various fonts for a type specimen book.It is difficult to find examples of lorem ipsum in use before Letraset made it popular as a dummy text in the 1960s, although McClintock says he remembers coming across the lorem ipsum passage in a book of old metal type samples. So far he hasnt relocated where he once saw the passage, but the popularity of Cicero in the 15th century supports the theory that the filler text has been used for centuries.d anyways, as Cecil Adams reasoned, “[Do you really] think graphic arts supply houses were hiring classics scholars in the 1960s?” Perhaps. But it seems reasonable to imagine that there was a version in use far before the age of Letraset',
  category: 'arts'
};
describe('Testing the authorization', () => {
  it('should return an error if the user has not logged in', (done) => {
    const { title, ...rest } = fakeArticle;
    chai
      .request(server)
      .post('/api/articles')
      .send(rest)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(statusCode.UNAUTHORIZED);
        expect(body).to.have.property('message', errorMessages.authenticationMessage);
        done();
      });
  });
});
describe('create article', () => {
  const user = {
    username: 'dianeMurekatete',
    email: 'diane@gmail.com',
    password: 'password23423',
    confirmPassword: 'password23423'
  };

  before((done) => {
    chai
      .request(server)
      .post('/api/users/signup ')
      .send(user)
      .end((err, res) => {
        res.should.have.status(statusCode.CREATED);
        res.body.should.be.an('Object');
        userToken = res.body.user.token;

        done();
      });
  });
  it('should create an article', (done) => {
    const { ...rest } = fakeArticle;
    chai
      .request(server)
      .post('/api/articles')
      .set('Authorization', `Bearer ${userToken}`)
      .field(rest)
      .attach('image', './tests/images/image.jpeg')
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(statusCode.CREATED);
        expect(body).to.have.property('message', errorMessages.articleCreate);
        done();
      });
  });

  describe('validate article', () => {
    it('should not post an article without title ', (done) => {
      const { title, ...rest } = fakeArticle;
      chai
        .request(server)
        .post('/api/articles')
        .set('Authorization', `Bearer ${userToken}`)
        .field(rest)
        .attach('image', './tests/images/image.jpeg')
        .end((err, res) => {
          const { status, body } = res;
          expect(status).to.equal(statusCode.BAD_REQUEST);
          expect(body).to.have.property('message', errorMessages.title);
          done();
        });
    });
    it('should not post an article without description', (done) => {
      const { description, ...rest } = fakeArticle;
      chai
        .request(server)
        .post('/api/articles')
        .set('Authorization', `Bearer ${userToken}`)
        .field(rest)
        .attach('image', './tests/images/image.jpeg')
        .end((err, res) => {
          const { status, body } = res;
          expect(status).to.equal(statusCode.BAD_REQUEST);
          expect(body).to.have.property('message', errorMessages.description);
          done();
        });
    });
  });
  it('should not post an article without body', (done) => {
    const { body: b, ...rest } = fakeArticle;
    chai
      .request(server)
      .post('/api/articles')
      .set('Authorization', `Bearer ${userToken}`)
      .field(rest)
      .attach('image', './tests/images/image.jpeg')
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(statusCode.BAD_REQUEST);
        expect(body).to.have.property('message', errorMessages.body);
        done();
      });
  });
  it('should not post an article without category', (done) => {
    const { category, ...rest } = fakeArticle;
    chai
      .request(server)
      .post('/api/articles')
      .set('Authorization', `Bearer ${userToken}`)
      .field(rest)
      .attach('image', './tests/images/image.jpeg')
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(statusCode.BAD_REQUEST);
        expect(body).to.have.property('message', errorMessages.category);
        done();
      });
  });
});
