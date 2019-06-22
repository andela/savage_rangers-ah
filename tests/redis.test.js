import chai from 'chai';
import blacklist from '../src/helpers/Blacklist.redis';

const { expect } = chai;

describe('redis test', () => {
  it('should blacklist the token', (done) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiTUNGcmFuazE2IiwiZW1haWwiOiJtZWNmcmFuazE2QGdtYWlsLmNvbSJ9LCJpYXQiOjE1NjA3OTYwMDAsImV4cCI6MTU2MDg4MjQwMH0.9D8uFVMwhX2q9UNCy948YomwhFiepS4OgyBD2rwjMco';
    const blackToken = blacklist(token);
    expect(blackToken).to.eql(true);
    done();
  });
});
