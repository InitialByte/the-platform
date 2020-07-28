import {Router} from 'express';
import {signinController} from './controller/signin';
// import {signoutController} from './controller/signout';
// import {updateTokenController} from './controller/refreshtoken';
import {healthController} from './controller/health';

export const router = Router();

router.get('/health', healthController);
router.get('/signin', signinController);
// router.get('/updatetoken', updateTokenController);
// router.get('/signout', signoutController);
