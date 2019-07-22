import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import status from '../src/helpers/constants/status.codes';
import generateToken from '../src/helpers/tests/adminSignIn';

chai.use(chaiHttp);
chai.should();

const adminUrl = '/api/admin/comments';
const commentId = 5;
const deleteCommentId = 800;
const body = 'How to create sequalize seeds::';

const userToken = generateToken();

const { expect } = chai;

chai.use(chaiHttp);

describe('test the controller for an admin to get reported comment', () => {
  it('Admin should be able to get all reported comments ', (done) => {
    chai
      .request(app)
      .get('/api/admin/comments/reported')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .eql(status.OK);
        expect(res.body).to.have.property('paginationDetails');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0])
          .to.have.property('createdAt')
          .eql(res.body.data[0].createdAt);
        expect(res.body.data[0])
          .to.have.property('Comment')
          .to.be.an('object');
        expect(res.body.data[0].Comment)
          .to.have.property('id')
          .eql(res.body.data[0].Comment.id);
        expect(res.body.data[0].Comment)
          .to.have.property('body')
          .eql(res.body.data[0].Comment.body);
        expect(res.body.data[0].Comment)
          .to.have.property('articleSlug')
          .eql(res.body.data[0].Comment.articleSlug);
        expect(res.body.data[0])
          .to.have.property('User')
          .to.be.an('object');
        expect(res.body.data[0].User)
          .to.have.property('username')
          .eql(res.body.data[0].User.username);
        expect(res.body.data[0].User)
          .to.have.property('email')
          .eql(res.body.data[0].User.email);
        expect(res.body.data[0])
          .to.have.property('Reason')
          .to.be.an('object');
        expect(res.body.data[0].Reason)
          .to.have.property('description')
          .eql(res.body.data[0].Reason.description);

        done();
      });
  });

  it('Admin should be able to get all reported comments and respond when there are any reports', (done) => {
    const id = 4;
    chai
      .request(app)
      .get(`/api/admin/comments/${id}/reported`)
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .eql(status.OK);
        expect(res.body)
          .to.have.property('message')
          .eql('No reports for this comment.');
        done();
      });
  });

  it('Admin should be able to get all reported comments based on a particular commentId', (done) => {
    const id = 6;
    chai
      .request(app)
      .get(`/api/admin/comments/${id}/reported`)
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .eql(status.OK);
        expect(res.body.data)
          .to.have.property('id')
          .eql(res.body.data.id);
        expect(res.body.data)
          .to.have.property('body')
          .eql(res.body.data.body);
        expect(res.body.data)
          .to.have.property('userId')
          .eql(res.body.data.userId);
        expect(res.body.data)
          .to.have.property('articleSlug')
          .eql(res.body.data.articleSlug);
        expect(res.body.data)
          .to.have.property('Reasons')
          .to.be.an('array');
        expect(res.body.data.Reasons[0])
          .to.have.property('id')
          .eql(res.body.data.Reasons[0].id);
        expect(res.body.data.Reasons[0])
          .to.have.property('description')
          .eql(res.body.data.Reasons[0].description);
        expect(res.body.data.Reasons[0])
          .to.have.property('ReportComments')
          .to.be.an('object');
        expect(res.body.data.Reasons[0].ReportComments)
          .to.have.property('userId')
          .eql(res.body.data.Reasons[0].ReportComments.userId);
        done();
      });
  });
  it('Admin should block reported comment', (done) => {
    chai
      .request(app)
      .patch(`${adminUrl}/${commentId}/block`)
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.should.have.property('message').eql(`${body} blocked successfully`);
        done();
      });
  });
  it('Admin should not block reported comment which is already blocked', (done) => {
    chai
      .request(app)
      .patch(`${adminUrl}/${commentId}/block`)
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.should.have
          .property('errors')
          .property('isBlocked')
          .eql(`${commentId} is already blocked`);
        done();
      });
  });

  it('Admin should unblock a blocked comment', (done) => {
    chai
      .request(app)
      .patch(`${adminUrl}/${commentId}/unblock`)
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        res.body.should.have.property('message').eql(`${body} unblocked successfully`);
        done();
      });
  });
  it('Admin should not unblock reported comment which is not blocked', (done) => {
    chai
      .request(app)
      .patch(`${adminUrl}/${commentId}/unblock`)
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        res.body.should.have
          .property('errors')
          .property('isBlocked')
          .eql(`${commentId} is already unblocked`);
        done();
      });
  });
  it('Admin should not unblock reported comment which is deleted', (done) => {
    chai
      .request(app)
      .patch(`${adminUrl}/${deleteCommentId}/unblock`)
      .set('Authorization', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        res.body.should.have
          .property('errors')
          .property('id')
          .eql(`Comment with id ${deleteCommentId} is not found, Thanks`);
        done();
      });
  });
});
