import '@babel/polyfill';
import chai from 'chai';
import chaihttp from 'chai-http';
import chailike from 'chai-like';
import chaithing from 'chai-things';
import server from '../src/index';
import status from '../src/helpers/constants/status.codes';
import errorMessage from '../src/helpers/constants/error.messages';

chai.use(chaihttp);
chai.use(chailike);
chai.use(chaithing);
chai.should();

describe('GET /articles/:slug', () => {
  it('Should return the article', (done) => {
    chai
      .request(server)
      .get('/api/articles/How-to-create-sequalize-seeds')
      .end((err, res) => {
        res.should.have.a.status(status.OK);
        res.body.should.be.an('object');
        res.body.should.have.property('article');
        res.body.article.should.property('title', 'How to create sequalize seeds');
        done();
      });
  });

  it('Should return a message when article not found', (done) => {
    chai
      .request(server)
      .get('/api/articles/How-to-create-sequalize-seed')
      .end((err, res) => {
        res.should.have.a.status(status.NOT_FOUND);
        res.body.should.be.an('object');
        res.body.errors.Article.should.be.eq(errorMessage.noArticles);
        done();
      });
  });
});

describe('GET /articles', () => {
  it('Should respond with a list of articles', (done) => {
    chai
      .request(server)
      .get('/api/articles')
      .end((err, res) => {
        res.should.have.a.status(status.OK);
        res.body.result.Articles.should.be.an('array');
        res.body.result.should.have.property('Articles');
        res.body.result.Articles.should.contain.something.like({
          id: 1,
          title: 'How to create sequalize seeds',
          description: 'How to set dummy data automatically',
          body:
           'Suppose we want to insert some data into a few tables by default. If we follow up on previous example we can consider creating a demo user for User table.To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database table with sample data or test data.Let\'s create a seed file which will add a demo user to our User table.',
          slug: 'How-to-create-sequalize-seeds',
          coverImage: 'default.jpeg',
          tagList: ['postgres', 'express', 'sequelize'],
          Category: {
            name: 'LOVE'
          },
          User: {
            firstName: 'Alain',
            lastName: 'Burindi',
            profileImage: 'defaultAvatar.jpg'
          }
        });
        done();
      });
  });
  it('Should respond with a message if there no more articles', (done) => {
    chai
      .request(server)
      .get('/api/articles/?offset=10&limit=10')
      .end((err, res) => {
        res.should.have.a.status(status.NOT_FOUND);
        res.body.errors.Articles.should.be.eq(errorMessage.noMoreArticle);
        done();
      });
  });
});
