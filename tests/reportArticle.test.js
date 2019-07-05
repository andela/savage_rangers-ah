import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import status from '../src/helpers/constants/status.codes';

const { expect } = chai;
chai.use(chaiHttp);
let UserToken = '';

describe('testing the report article endpoint', () => {
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

  it('should report an article', (done) => {
    const slug = 'What-is-a-Version-1-UUID';
    chai
      .request(app)
      .post(`/api/articles/${slug}/report`)
      .set('authorization', UserToken)
      .send({
        reason: 1
      })
      .end((err, res) => {
        expect(res.status).eql(status.CREATED);
        expect(res.body)
          .to.have.property('message')
          .eql(`Report for ${slug} is successfully submitted, Thanks`);
        done();
      });
  });

  it('should report an article', (done) => {
    const slug = 'What-is-a-Version-1-UUID';
    chai
      .request(app)
      .post(`/api/articles/${slug}/report`)
      .set('authorization', UserToken)
      .send({
        reason: 1
      })
      .end((err, res) => {
        expect(res.status).eql(status.BAD_REQUEST);
        expect(res.body.errors)
          .to.have.property('Message')
          .eql(`Sorry, You can not report this ${slug} with the same reason twice, Thanks `);
        done();
      });
  });

  it('should report an article', (done) => {
    const slug = 'What-is-a-Version-1-UUID';
    chai
      .request(app)
      .post(`/api/articles/${slug}/report`)
      .set('authorization', UserToken)
      .send({
        reason: 9
      })
      .end((err, res) => {
        expect(res.status).eql(status.NOT_FOUND);
        expect(res.body.errors)
          .to.have.property('Message')
          .eql('Sorry, but that reason does not exist, Thanks');
        done();
      });
  });
});
