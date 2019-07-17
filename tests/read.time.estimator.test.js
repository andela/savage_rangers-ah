import chai from 'chai';
import chaiHttp from 'chai-http';
import readTimeEstimator from '../src/helpers/read.time.estimator';

chai.use(chaiHttp);
chai.should();

describe('Read time estimator', () => {
  it('SHould return the estimated time', (done) => {
    const time1 = readTimeEstimator('This text is supposed to be the body of an article <img');
    const time2 = readTimeEstimator('This text is supposed to be the body of an article <img <img');
    const time3 = readTimeEstimator('This text is supposed to be the body of an article <img <img <img');
    time1.should.be.a('Number');
    time2.should.be.a('Number');
    time3.should.be.a('Number');
    done();
  });
  it('SHould return the same number for two tests with the same length', (done) => {
    const time1 = readTimeEstimator('I really like the python language. It simplifies life');
    const time2 = readTimeEstimator("python is the best language I've ever used in my life");
    time1.should.be.eql(time2);
    done();
  });
});
