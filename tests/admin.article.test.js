import chai from 'chai';
import '@babel/polyfill';
import chaiHttp from 'chai-http';
import status from '../src/helpers/constants/status.codes';
import server from '../src/index';
import error from '../src/helpers/constants/error.messages';
import signup from '../src/helpers/tests/signup';

chai.use(chaiHttp);
chai.should();

const fakeAdmin = signup();

let userToken = '';
const slug = 'How-to-create-sequalize-seeds';
const password = 'password23423';
const adminUrl = '/api/admin/article';
const data = {
  ReportedOn: '2019-07-11T07:58:55.653Z',
  Article: {
    title: 'How to create sequalize seeds',
    slug: 'How-to-create-sequalize-seeds',
    description: 'How to set dummy data automatically',
    body:
      "Suppose we want to insert some data into a few tables by default. If we follow up on previous example we can consider creating a demo user for User table.To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database table with sample data or test data.Let's create a seed file which will add a demo user to our User table.",
    coverImage: 'default.jpeg'
  },
  User: { username: 'BurindiAlain12', email: 'alain12@gmail.com' },
  Reason: { description: 'this content exploits the minors' }
};
describe('Article', () => {
  it('should login the moderetor to get the token', (done) => {
    chai
      .request(server)
      .post('/api/users/login')
      .send({
        email: 'alain13@gmail.com',
        password
      })
      .end((err, res) => {
        res.should.have.status(status.OK);
        userToken = res.body.user.token;
        done();
      });
  });
  it('Admin should fetch all articles', (done) => {
    chai
      .request(server)
      .get(`${adminUrl}s`)
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.result.Articles[0].title.should.include(data.Article.title);
        res.body.result.Articles[0].description.should.include(data.Article.description);
        res.body.result.Articles[0].body.should.include(data.Article.body);
        done();
      });
  });
  it('Should respond with a message if there no more Articles', (done) => {
    chai
      .request(server)
      .get(`${adminUrl}s/?offset=202&limit=10`)
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.a.status(status.NOT_FOUND);
        res.body.errors.should.have.property('Articles').eql(error.noMoreArticle);
        done();
      });
  });
  it('Admin should fetch single article', (done) => {
    chai
      .request(server)
      .get(`${adminUrl}/${slug}`)
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.body.should.have.status(status.OK);
        res.body.article.title.should.include(data.Article.title);
        res.body.article.description.should.include(data.Article.description);
        res.body.article.body.should.include(data.Article.body);
        done();
      });
  });
  it('Admin should fetch all reported article', (done) => {
    chai
      .request(server)
      .get(`${adminUrl}s/reported`)
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.data[0].Reason.should.include(data.Reason);
        res.body.data[0].User.should.include(data.User);
        res.body.data[0].Article.title.should.include(data.Article.title);
        res.body.data[0].Article.description.should.include(data.Article.description);
        res.body.data[0].Article.body.should.include(data.Article.body);
        done();
      });
  });
  it('Admin should fetch single reported article', (done) => {
    chai
      .request(server)
      .get(`${adminUrl}/${slug}/reported`)
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.data.Reason.should.include(data.Reason);
        res.body.data.User.should.include(data.User);
        res.body.data.Article.title.should.include(data.Article.title);
        res.body.data.Article.description.should.include(data.Article.description);
        res.body.data.Article.body.should.include(data.Article.body);
        done();
      });
  });

  it('Admin should block reported article', (done) => {
    chai
      .request(server)
      .patch(`${adminUrl}/${slug}/block`)
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.should.have.property('message').eql(`${slug} blocked successfully`);
        done();
      });
  });
  it('Admin should not block reported article whitch is already blocked', (done) => {
    chai
      .request(server)
      .patch(`${adminUrl}/${slug}/block`)
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.should.have
          .property('errors')
          .property('isBlocked')
          .eql(`${slug} is already blocked`);
        done();
      });
  });

  it('Admin should unblock a blocked article', (done) => {
    chai
      .request(server)
      .patch(`${adminUrl}/${slug}/unblock`)
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.should.have.property('message').eql(`${slug} unblocked successfully`);
        done();
      });
  });
  it('Admin should not unblock reported article whitch is not blocked', (done) => {
    chai
      .request(server)
      .patch(`${adminUrl}/${slug}/unblock`)
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.should.have
          .property('errors')
          .property('isBlocked')
          .eql(`${slug} is not blocked`);
        done();
      });
  });
  it('Admin should fail to unblock an Article because the unblocker is not admin', (done) => {
    chai
      .request(server)
      .patch(`${adminUrl}/${slug}/unblock`)
      .set('Authorization', `${fakeAdmin}`)
      .end((err, res) => {
        res.should.have.status(status.ACCESS_DENIED);
        res.body.should.have
          .property('errors')
          .property('role')
          .eql(error.noAccess);
        done();
      });
  });
});
