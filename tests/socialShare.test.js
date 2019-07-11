import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import status from '../src/helpers/constants/status.codes';
import signupUser from '../src/helpers/tests/signup';

const { expect } = chai;
chai.use(chaiHttp);

const userToken = signupUser();
const slug = 'What-is-a-Version-1-UUID';
const title = 'What is a Version 1 UUID';

describe(' testing the social share endpoints', () => {
  it('should share via facebook', (done) => {
    chai
      .request(app)
      .post(`/api/articles/${slug}/share/facebook`)
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res.body).to.have.property('status').eql(status.CREATED);
        expect(res.body).to.have.property('message').eql(`${title} has been shared successfully on facebook, Thanks`);
        done();
      });
  });

  it('should share via twitter', (done) => {
    chai
      .request(app)
      .post(`/api/articles/${slug}/share/twitter`)
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res.body).to.have.property('status').eql(status.CREATED);
        expect(res.body).to.have.property('message').eql(`${title} has been shared successfully on twitter, Thanks`);
        done();
      });
  });

  it('should share via linkedin', (done) => {
    chai
      .request(app)
      .post(`/api/articles/${slug}/share/linkedin`)
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res.body).to.have.property('status').eql(status.CREATED);
        expect(res.body).to.have.property('message').eql(`${title} has been shared successfully on linkedin, Thanks`);
        done();
      });
  });

  it('should share via gmail', (done) => {
    chai
      .request(app)
      .post(`/api/articles/${slug}/share/gmail`)
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res.body).to.have.property('status').eql(status.CREATED);
        expect(res.body).to.have.property('message').eql(`${title} has been shared successfully on gmail, Thanks`);
        done();
      });
  });
});
