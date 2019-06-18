import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../src/index';

chai.use(chaiHttp);
chai.should();

describe('Home', () => {
	it('should return the welcome message', (done) => {
		chai
			.request(server)
			.get('/')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.an('Object');
				res.body.should.have.property('data');
				done();
			});
	});
});
