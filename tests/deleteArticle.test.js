import chai from 'chai';
import '@babel/polyfill';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import status from '../src/helpers/constants/status.codes';
import server from '../src/index';
import generateToken from '../src/helpers/tokens/generate.token';
import models from '../src/api/models';

const { Article } = models;
const { User } = models;

chai.use(chaiHttp);
chai.should();
dotenv.config();

// eslint-disable-next-line no-unused-vars
let newArticle;
let Atoken;
let newUser;
describe('deleteArticle', () => {
  before(async () => {
    const user = {
      firstName: 'Rama',
      lastName: 'Dhan',
      username: 'Ramaa',
      email: 'rama@gmail.com',
      password: 'Rama01@#sgh!',
      confirmPassword: 'Rama01@#sgh!'
    };

    newUser = await User.create(user);

    Atoken = generateToken((user.email, user.id), process.env.TOKEN_KEY);

    const article = {
      title: 'This is Andela',
      description: 'A technology company specializing in training software engineers ',
      body:
        'Thursday 26 may lastyear launched its Kigali office. Its new offices are housed within the University of Rwanda',
      userId: newUser.id,
      slug: 'This-is-Andela',
      tagList: ['Tech', 'Kigali'],
      category: 'tecknology'
    };
    newArticle = await Article.create(article);
  });

  it('should delete article', (done) => {
    chai
      .request(server)
      .delete('/api/articles/This-is-Andela')
      .set('Authorization', `Bearer ${Atoken}`)
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });

  it('should fail to delete article', (done) => {
    chai
      .request(server)
      .delete('/api/articles/This-is-it')
      .set('Authorization', `Bearer ${Atoken}`)
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
});
