/* eslint-disable max-len */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

const { expect } = chai;
chai.use(chaiHttp);

describe('testing the signout controller', () => {
  // it('should check if the token exist and destroy it', (done) => {
  //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZnVsbE5hbWVzIjoiSXRldGVyZSBCcnVuZSIsImVtYWlsIjoiQnJ1bmVJVDc3QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA4JDlvR0ZXelFVbmRPVWpEUDdRd29EdnUvdjdPY0pZOC50MzRaSnVBd1NmZHRxUHplTzlzR0RHIiwiY3JlYXRlZEF0IjoiMjAxOS0wNS0yOFQxMDo1ODowNS44MDRaIiwidXBkYXRlZEF0IjoiMjAxOS0wNS0yOFQxMDo1ODowNS44MDRaIiwiaWF0IjoxNTYwMTkzMjU3LCJleHAiOjE1NjAyNzk2NTd9.c0Scxn3kviL21C0UEo6dXfFcHpbtwcRYB4m01D5jnfM';
  //   chai.request(app)
  //     .get('/api/auth/signout')
  //     .set('Authorization', `${token}`)
  //     .end((err, res) => {
  //       expect(res.body).to.have.status(200);
  //       expect(res.body).to.have.property('message').eql('You are signed out');
  //       done();
  //     });
  // });

  it('should check if the token doesn\'t exist and ask a user to sign in first', (done) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZnVsbE5hbWVzIjoiSXRldGVyZSBCcnVuZSIsImVtYWlsIjoiQnJ1bmVJVDc3QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA4JDlvR0ZXelFVbmRPVWpEUDdRd29EdnUvdjdPY0pZOC50MzRaSnVBd1NmZHRxUHplTzlzR0RHIiwiY3JlYXRlZEF0IjoiMjAxOS0wNS0yOFQxMDo1ODowNS44MDRaIiwidXBkYXRlZEF0IjoiMjAxOS0wNS0yOFQxMDo1ODowNS44MDRaIiwiaWF0IjoxNTYwMTkzMjU3LCJleHAiOjE1NjAyNzk2NTd9.c0Scxn3kviL21C0UEo6dXfFcHpbtwcRYB4m01D5jnfM';
    chai.request(app)
      .get('/api/auth/signout')
      .set('Authorization', `${token}`)
      .end((err, res) => {
        expect(res.body).to.have.status(404);
        expect(res.body).to.have.property('message').eql('You must first sign in, Thanks');
        done();
      });
  });
});
