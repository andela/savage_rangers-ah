import chai from 'chai';
import sinon from 'sinon';
import mailer from '@sendgrid/mail';
import '@babel/polyfill';
import chaiHttp from 'chai-http';
import status from '../src/helpers/constants/status.codes';
import server from '../src/index';
import error from '../src/helpers/constants/error.messages';
import signup from '../src/helpers/tests/signup';

chai.use(chaiHttp);
chai.should();

let userToken = '';
const fakeAdmin = signup();
const email = 'alain20@gmail.com';
const password = 'password23423';
const adminUrl = '/api/admin/users';

describe('Users', () => {
  before(() => {
    sinon.stub(mailer, 'send').yields(JSON.stringify([]));
  });
  it('should login the user to get the token', (done) => {
    chai
      .request(server)
      .post('/api/users/login')
      .send({
        email: 'alain12@gmail.com',
        password
      })
      .end((err, res) => {
        res.should.have.status(status.OK);
        userToken = res.body.user.token;
        done();
      });
  });
  it('Admin should create a new user', (done) => {
    chai
      .request(server)
      .post(`${adminUrl}`)
      .set('Authorization', `${userToken}`)
      .send({
        username: 'BurindiAlain1',
        email: 'alain@gmail.com',
        password
      })
      .end((err, res) => {
        res.should.have.status(status.CREATED);
        res.body.should.have.property('message').eql('user created successfully');
        res.body.user.should.have.property('email').eql('alain@gmail.com');
        done();
      });
  });
  it('Admin should not create a new user who already exists', (done) => {
    chai
      .request(server)
      .post(`${adminUrl}`)
      .set('Authorization', `${userToken}`)
      .send({
        username: 'BurindiAlain1',
        email: 'alain@gmail.com',
        password
      })
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.errors.should.have.property('email').eql(error.emailExists);
        done();
      });
  });
  it('Admin should fail to find a user to update', (done) => {
    chai
      .request(server)
      .patch(`${adminUrl}/alain300@gmail.com`)
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        res.body.should.have.property('message').eql(error.noUser);
        done();
      });
  });
  it('Admin should update a user', (done) => {
    chai
      .request(server)
      .patch(`${adminUrl}/alain44@gmail.com`)
      .set('Authorization', `${userToken}`)
      .send({
        firstName: 'Elie',
        lastName: 'Gahene',
        username: 'Gakoko',
        password
      })
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.should.have.property('message').eql('user updated successufully');
        done();
      });
  });
  it('Admin should fetch all users', (done) => {
    chai
      .request(server)
      .get(`${adminUrl}`)
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.result.users[0].should.have.property('username').eql('Burindi');
        res.body.result.users[0].should.have.property('email').eql('alain1@gmail.com');
        done();
      });
  });
  it('Should respond with a message if there no more users', (done) => {
    chai
      .request(server)
      .get(`${adminUrl}/?offset=202&limit=10`)
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.a.status(status.NOT_FOUND);
        res.body.should.have.property('message').eql(error.noMoreUsers);
        done();
      });
  });
  it('Admin should update a user with the same data', (done) => {
    chai
      .request(server)
      .patch(`${adminUrl}/alain5@gmail.com`)
      .set('Authorization', `${userToken}`)
      .send({
        firstName: 'burundi',
        lastName: 'DieHard',
        username: 'BurindiAlain5',
        password
      })
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.should.have.property('message').eql('user updated successufully');
        done();
      });
  });
  it('Admin should make a user moderator', (done) => {
    chai
      .request(server)
      .patch(`${adminUrl}/add/${email}/moderator`)
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.should.have.property('message').eql(`${email} is now a moderator`);
        done();
      });
  });
  it('Admin should fail to make a user a moderator who is already a moderator', (done) => {
    chai
      .request(server)
      .patch(`${adminUrl}/add/${email}/moderator`)
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.should.have
          .property('errors')
          .property('role')
          .eql(`${email} ${error.moderator}`);
        done();
      });
  });
  it('Admin should remove moderator role to a user', (done) => {
    chai
      .request(server)
      .patch(`${adminUrl}/remove/${email}/moderator`)
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.should.have.property('message').eql(`${email} is no longer a moderator`);
        done();
      });
  });
  it('Admin should fail to remove moderator role to a user who is notmoderator', (done) => {
    chai
      .request(server)
      .patch(`${adminUrl}/remove/${email}/moderator`)
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.should.have
          .property('errors')
          .property('role')
          .eql(`${email} ${error.notModerator}`);
        done();
      });
  });
  it('Admin should block a user', (done) => {
    chai
      .request(server)
      .patch(`${adminUrl}/${email}/block`)
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.should.have.property('message').eql(`${email} blocked successfully`);
        done();
      });
  });
  it('Admin should fail to block a user who is already blocked', (done) => {
    chai
      .request(server)
      .patch(`${adminUrl}/${email}/block`)
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.should.have
          .property('errors')
          .property('isBlocked')
          .eql(`${email} ${error.blocked}`);
        done();
      });
  });
  it('Admin should unblock a user', (done) => {
    chai
      .request(server)
      .patch(`${adminUrl}/${email}/unblock`)
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.should.have.property('message').eql(`${email} unblocked successfully`);
        done();
      });
  });
  it('Admin should fail to unblock a user who is not blocked', (done) => {
    chai
      .request(server)
      .patch(`${adminUrl}/${email}/unblock`)
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.should.have
          .property('errors')
          .property('isBlocked')
          .eql(`${email} ${error.notBlocked}`);
        done();
      });
  });
  it('Admin should fail to unblock a user because the unblocker is not admin', (done) => {
    chai
      .request(server)
      .patch(`${adminUrl}/${email}/unblock`)
      .set('Authorization', `${fakeAdmin}`)
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.should.have
          .property('errors')
          .property('role')
          .eql(error.notAdmin);
        done();
      });
  });
});
