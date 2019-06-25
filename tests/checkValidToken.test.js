import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import statuses from '../src/helpers/constants/status.codes';

const { expect } = chai;
chai.use(chaiHttp);

describe('testing the signout controller', () => {
  it('should check for an empty token and alert that the user is unauthorized', (done) => {
    chai
      .request(app)
      .get('/api/users/signout')
      .set('Authorization', 'asdfafcad')
      .end((err, res) => {
        expect(res.body).to.have.status(statuses.UNAUTHORIZED);
        expect(res.body)
          .to.have.property('message')
          .eql('Forbiden access');
        done();
      });
  });

  it('should check for a token and alert that it is no longer valid', (done) => {
    chai
      .request(app)
      .get('/api/users/signout')
      .set('Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiTUNGcmFuazE2IiwiZW1haWwiOiJtZWNmcmFuazE2QGdtYWlsLmNvbSJ9LCJpYXQiOjE1NjA3OTYwMDAsImV4cCI6MTU2MDg4MjQwMH0.9D8uFVMwhX2q9UNCy948YomwhFiepS4OgyBD2rwjMco')
      .end((err, res) => {
        expect(res.body).to.have.status(statuses.UNAUTHORIZED);
        expect(res.body).to.have.property('error').eql('Token is no longer valid');
        done();
      });
  });
});
