import { Router } from 'express';

import multer from 'multer';
import * as moodsController from '../controllers/moodsControllers.js';
import { authenticateToken } from '../middlewares/auth.js';


const router: Router = Router();
const upload = multer();

router.get(
  '/',
  moodsController.getAll
);


router.get(
  '/:id',
  moodsController.getById
);


router.post(
  '/',
  authenticateToken,
  upload.none(),
  moodsController.create
);


router.put(
  '/:id',
  authenticateToken,
  upload.none(),
  moodsController.update
);


router.delete(
  '/:id',
  authenticateToken,
  upload.none(),
  moodsController.remove
);



export default router;