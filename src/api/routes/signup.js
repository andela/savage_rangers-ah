import router from 'express';
import ValidateUser from '../../middlewares/ValidateUser';

const route = router();

route.post('/signup', ValidateUser.validateSignup);

export default route;
