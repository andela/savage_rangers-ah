import '@babel/polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import models from '../src/api/models/index';

import server from '../src/index';

chai.use(chaiHttp);
chai.should();

describe('Like article', () => {
  it('should like an article', (done) => {
    chai
      .request(server)
      .post('/api/articles/1/like')
      .end((err, res) => {
        done();
      });
  });
});

describe('Dislike article', () => {
  it('should dislike an article', (done) => {
    chai
      .request(server)
      .post('/api/articles/1/dislike')
      .end((err, res) => {
        done();
      });
  });
});
