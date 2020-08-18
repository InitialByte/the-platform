import {Router} from 'express';
import {refreshController} from './controller/refresh';
import {checkController} from './controller/check';
import {healthController} from './controller/health';

export const router = Router();

router.get('/health', healthController);
router.get('/refresh', refreshController);
router.get('/check', checkController);
