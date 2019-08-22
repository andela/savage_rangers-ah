import chai from 'chai';
import '@babel/polyfill';
import chaiHttp from 'chai-http';
import statusCode from '../src/helpers/constants/status.codes';
import server from '../src/index';

chai.use(chaiHttp);
chai.should();
let userToken;

const { expect } = chai;
const fakeArticle = {
  title: 'So how did the classical Latin become so incoherent? According to McClintock',
  description:
    ' how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part o',
  coverImage: 'http://jpeg.jpeg',
  body:
    'po how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Ciceros De Finibus in order to provide placeholder text to mockup various fonts for a type specimen book.It is difficult to find examples of lorem ipsum in use before Letraset made it popular as a dummy text in the 1960s, although McClintock says he remembers coming across the lorem ipsum passage in a book of old metal type samples. So far he hasnt relocated where he once saw the passage, but the popularity of Cicero in the 15th century supports the theory that the filler text has been used for centuries.d anyways, as Cecil Adams reasoned, “[Do you really] think graphic arts supply houses were hiring classics scholars in the 1960s?” Perhaps. But it seems reasonable to imagine that there was a version in use far before the age of Letraset',
  category: 1,
  tags: ['IOT3', 'IOT2', 'IOT3', 'figma', 'visio']
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
        expect(body).to.have.property('message');
        expect(body.message).to.eql('Forbiden access');
        done();
      });
  });
});

describe('create  article', () => {
  const user = {
    email: 'alain1@gmail.com',
    password: 'password23423'
  };

  before((done) => {
    chai
      .request(server)
      .post('/api/users/login')
      .send(user)
      .end((err, res) => {
        userToken = res.body.user.token;
        done();
      });
  });
  it('should  post an article  ', (done) => {
    const { ...rest } = fakeArticle;
    chai
      .request(server)
      .post('/api/articles')
      .set('authorization', userToken)
      .send(rest)
      .end((err, res) => {
        const { status } = res;
        expect(status).to.equal(statusCode.CREATED);
        done();
      });
  });
  it('should not post an article without title ', (done) => {
    const { title, ...rest } = fakeArticle;
    chai
      .request(server)
      .post('/api/articles')
      .set('authorization', userToken)
      .send(rest)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(statusCode.BAD_REQUEST);
        expect(body).to.have.property('errors');
        done();
      });
  });
  it('should not post with a wrong description', (done) => {
    chai
      .request(server)
      .post('/api/articles')
      .set('authorization', userToken)
      .send({ title: 'blablabla', description: 1, tags: [] })
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(statusCode.BAD_REQUEST);
        expect(body).to.have.property('errors');
        done();
      });
  });
  it('should not post an article with a wrong body', (done) => {
    chai
      .request(server)
      .post('/api/articles')
      .set('authorization', userToken)
      .send({ title: 'blablabla', body: 1, tags: [] })
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(statusCode.BAD_REQUEST);
        expect(body).to.have.property('errors');
        done();
      });
  });
  it('should not post an article with a wrong category', (done) => {
    chai
      .request(server)
      .post('/api/articles')
      .set('authorization', userToken)
      .send({ title: 'blablabla', category: 'jhd', tags: [] })
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(statusCode.BAD_REQUEST);
        expect(body).to.have.property('errors');
        done();
      });
  });
  it('should display all article  by category Id', (done) => {
    chai
      .request(server)
      .get('/api/articles/category/1')
      .end((err, res) => {
        const { status } = res;
        expect(status).to.equal(statusCode.OK);
        done();
      });
  });
  it('should display a message if the article with specific category is not found', (done) => {
    chai
      .request(server)
      .get('/api/articles/category/4')
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(statusCode.NOT_FOUND);
        expect(body).to.have.property('message');
        expect(body.message).to.eql('Article with category: 4 not found');
        done();
      });
  });
});
