import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/index';
import status from '../src/helpers/constants/status.codes';
import blockArticle from '../src/helpers/notifications/block.article';
import blockComment from '../src/helpers/notifications/block.comment';

chai.use(chaiHttp);
chai.should();

// The test user
const user1 = {
  email: 'alain1@gmail.com',
  password: 'password23423'
};

const user2 = {
  email: 'alain2@gmail.com',
  password: 'password23423'
};

const notificationsConfig = {
  inApp: {
    articles: {
      show: false,
      on: ['report', 'block']
    },
    comments: {
      show: true,
      on: ['report', 'block']
    }
  },
  email: {
    articles: {
      show: false,
      on: ['report', 'block']
    },
    comments: {
      show: true,
      on: ['report', 'block']
    }
  }
};

let testUserToken1;
let testUserToken2;

describe('Notifications', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/users/login')
      .send(user1)
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.should.be.an('Object');
        testUserToken1 = res.body.user.token;
      });

    chai
      .request(server)
      .post('/api/users/login')
      .send(user2)
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.should.be.an('Object');
        testUserToken2 = res.body.user.token;
        done();
      });
  });

  it('should update the configurations of the user', (done) => {
    chai
      .request(server)
      .patch('/api/notifications/configuration')
      .send(notificationsConfig)
      .set('authorization', `${testUserToken1}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });

  it('should get the configurations of the user', (done) => {
    chai
      .request(server)
      .get('/api/notifications/configuration')
      .set('authorization', `${testUserToken1}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });

  it('should get all notifications sent for all previous events', (done) => {
    chai
      .request(server)
      .get('/api/notifications')
      .set('authorization', `${testUserToken1}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });

  it('should return an error when there is not notification', (done) => {
    chai
      .request(server)
      .get('/api/notifications')
      .set('authorization', `${testUserToken2}`)
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });

  it('should update a single notification', (done) => {
    chai
      .request(server)
      .patch('/api/notifications/1/seen')
      .set('authorization', `${testUserToken1}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });

  it('should not update a single notification twice with the same status', (done) => {
    chai
      .request(server)
      .patch('/api/notifications/1/seen')
      .set('authorization', `${testUserToken1}`)
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        done();
      });
  });

  it('should raise an error when the notification is not found', (done) => {
    chai
      .request(server)
      .patch('/api/notifications/100/seen')
      .set('authorization', `${testUserToken1}`)
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });

  it('should get all seen notifications of a user', (done) => {
    chai
      .request(server)
      .get('/api/notifications/seen')
      .set('authorization', `${testUserToken1}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });

  it('should not get all seen notifications of a deferent user', (done) => {
    chai
      .request(server)
      .get('/api/notifications/seen')
      .set('authorization', `${testUserToken2}`)
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });

  it('should get all unseen notifications of a user', (done) => {
    chai
      .request(server)
      .get('/api/notifications/unseen')
      .set('authorization', `${testUserToken1}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });

  it('should update a single notification with a different status', (done) => {
    chai
      .request(server)
      .patch('/api/notifications/1/unseen')
      .set('authorization', `${testUserToken1}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });

  it('should unsubscribe for emails', (done) => {
    chai
      .request(server)
      .get('/api/notifications/configuration/unsubscribe/email')
      .set('authorization', `${testUserToken1}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
});

describe('Notification helpers', () => {
  describe('Block article', () => {
    it('Should execute without params', () => {
      blockArticle();
    });
  });
  describe('Block comment', () => {
    it('Should execute without params', () => {
      blockComment();
    });
  });
});
