import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
// import nock from 'nock';
import server from '../src/index';

// const scope = nock('https://api.github.com')
// 	.post(
// 		'/api/auth/signup'
// 	)
// 	.reply(
// 		500,
// 		{
// 			message:
// 				'something wrong happened'
// 		}
// 	);

chai.use(chaiHttp);
chai.should();

const data = {
	username:
		'Burindi Alain',
	email:
		'alain@gmail.com',
	password:
		'password'
};

describe('Signup', () => {
	it('should register and give the token', (done) => {
		chai.request(server)
			.post('/api/auth/signup')
			.send({
				...data,
				confirmPassword:
						data.password
			})
			.end((err,
				res) => {
				const {
					body,
					status
				} = res;
				status.should.equal(201);
				body.should.have.property('user');
				body.user.should.have.property('email',
					data.email);
				body.should.have.property('token');
				done();
			});
	});
});

describe('Login', () => {
	it('should login and give a valid token', (done) => {
		chai.request(server)
			.post('/api/auth/login')
			.send({
				email:
						data.email,
				password:
						data.password
			})
			.end((err,
				res) => {
				const {
					body,
					status
				} = res;
				status.should.equal(200);
				body.should.have.property('user');
				body.user.should.have.property('email',
					data.email);
				body.should.have.property('token');
				done();
			});
	});

	it('should not login with a wrong password', (done) => {
		chai.request(server)
			.post('/api/auth/login')
			.send({
				email:
						data.email,
				password:
						'passwor5535'
			})
			.end((err,
				res) => {
				res.should.have.status(401);
				done();
			});
	});

	it('should not login an unexisting user', (done) => {
		chai.request(server)
			.post('/api/auth/login')
			.send({
				email:
						'alain666326@gmail.com',
				password:
						'password'
			})
			.end((err,
				res) => {
				const {
					body,
					status
				} = res;
				status.should.equal(404);
				body.should.have.property('message',
					"User doesn't exist");
				done();
			});
	});
});
