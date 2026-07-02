import { Router } from 'express';

import multer from 'multer';
import * as diariesController from '../controllers/diariesController.js';
import { authenticateToken } from '../middlewares/auth.js';


const router: Router = Router();
const upload = multer();

router.get(
  '/',
  diariesController.getAll
);


router.get(
  '/:id',
  diariesController.getById
);


router.post(
  '/',
  authenticateToken,
  upload.none(),
  diariesController.create
);


router.put(
  '/:id',
  authenticateToken,
  upload.none(),
  diariesController.update
);


router.delete(
  '/:id',
  authenticateToken,
  upload.none(),
  diariesController.remove
);



export default router;