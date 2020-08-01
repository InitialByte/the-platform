import {Router} from 'express';
import {signinController} from './controller/signin';
import {signoutController} from './controller/signout';
import {healthController} from './controller/health';

export const router = Router();

router.get('/health', healthController);
router.get('/signin', signinController);
router.get('/signout', signoutController);