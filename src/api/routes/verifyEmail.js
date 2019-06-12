import { Router } from 'express';
import VerifyEmail from '../controllers/verifyEmail';

const verifyEmail = Router();

verifyEmail.get('/', VerifyEmail.verifyEmail);

export default verifyEmail;
