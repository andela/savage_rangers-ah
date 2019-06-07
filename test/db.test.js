import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.use(chaiHttp);
chai.should();

let messageId;
describe('Test db.test.js', () => {
  it('should be able to post a new message', (done) => {
    chai.request(app)
      .post('/api/dbTest/create')
      .send({
        message: 'db ttesting'
      })
      .end((err, res) => {
        messageId = res.body.id;
        res.should.have.status(200);
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('should be able to get all messages', (done) => {
    chai.request(app)
      .get('/api/dbTest/get')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.have.property('data').to.be.an('array');
        done();
      });
  });

  it('should be able to delete message', (done) => {
    chai.request(app)
      .delete(`/api/dbTest/delete/${messageId}`)
      .send({
        message: 'db ttesting'
      })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.have.property('data').to.deep.equal('deleted successful');
        done();
      });
  });
});
