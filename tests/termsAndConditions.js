import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import statusCode from '../src/helpers/constants/status.codes';

const { expect } = chai;
chai.use(chaiHttp);
let userToken = '';

describe('test the terms and conditions controller', () => {
  it('should login a user and get a token to use against on rating article', (done) => {
    chai
      .request(app)
      .post('/api/users/login')
      .send({
        email: 'alain12@gmail.com',
        password: 'password23423'
      })
      .end((err, res) => {
        userToken = res.body.user.token;
        done();
      });
  });
  it('should display terms and conditions', (done) => {
    chai
      .request(app)
      .get('/api/termsAndConditions/1')
      .set('Authorization', userToken)
      .end((err, res) => {
        const { status } = res;
        expect(status).to.equal(statusCode.OK);
        done();
      });
  });
  it('should display the message if the terms and conditions are not found ', (done) => {
    chai
      .request(app)
      .put('/api/termsAndConditions/2')
      .set('Authorization', userToken)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(statusCode.NOT_FOUND);
        expect(body).to.have.property('errors');
        done();
      });
  });
  it('should update the terms and conditions', (done) => {
    chai
      .request(app)
      .put('/api/termsAndConditions/1')
      .set('Authorization', userToken)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(statusCode.OK);
        expect(body).to.have.property('message');
        expect(body.message).to.eql('updated successfully');
        done();
      });
  });
});
