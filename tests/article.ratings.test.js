import chai, { expect } from 'chai';
import '@babel/polyfill';
import chaiHttp from 'chai-http';
import status from '../src/helpers/constants/status.codes';

import server from '../src/index';

chai.use(chaiHttp);
chai.should();

// A user to enable tests
const user = {
  email: 'alain1@gmail.com',
  password: 'password23423'
};

let userToken;

describe('Article ratings statistics', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/users/login')
      .send(user)
      .end((err, res) => {
        res.body.should.be.an('Object');
        userToken = res.body.user.token;
        done();
      });
  });
  it('Should get the ratings statistics of a given article', (done) => {
    chai
      .request(server)
      .get('/api/articles/How-to-create-sequalize-seeds/ratings/statistics')
      .set('authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.data.statistics.should.be.an('Array');
        done();
      });
  });

  it('rates an article for further tests', (done) => {
    const slug = 'Test-to-update-ratings345hdsf';
    chai
      .request(server)
      .post(`/api/articles/${slug}/rating`)
      .set('Authorization', userToken)
      .send({
        rating: 1
      })
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .eql(status.CREATED);
        expect(res.body)
          .to.have.property('message')
          .eql(`Rating for ${slug} submitted successfully`);
        done();
      });
  });

  it('Should get statictics of an article rated by only one person', (done) => {
    chai
      .request(server)
      .get('/api/articles/Test-to-update-ratings345hdsf/ratings/statistics')
      .set('authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.data.statistics.should.be.an('Array');
        done();
      });
  });

  it("Should not get the ratings of an article that doesn't exist", (done) => {
    chai
      .request(server)
      .get('/api/articles/How-to-create-sequalize-seed/ratings/statistics')
      .set('authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
});

describe('Users who rated a particular article with a given rating', () => {
  it('Should get the users', (done) => {
    chai
      .request(server)
      .get('/api/articles/How-to-create-sequalize-seeds/4/users?limit=3&offset=1')
      .set('authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
  it('Should not get the users with an invalid offset', (done) => {
    chai
      .request(server)
      .get('/api/articles/How-to-create-sequalize-seeds/4/users?limit=3&offset=20')
      .set('authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
});
