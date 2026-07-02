import { Router } from 'express';

import multer from 'multer';
import * as mahasiswaController from '../controllers/mahasiswaController.js';
import { authenticateToken } from '../middlewares/auth.js';


const router: Router = Router();
const upload = multer();

router.get(
  '/',
  mahasiswaController.getAll
);


router.get(
  '/:id',
  mahasiswaController.getById
);


router.post(
  '/',
  authenticateToken,
  upload.none(),
  mahasiswaController.create
);


router.put(
  '/:id',
  authenticateToken,
  upload.none(),
  mahasiswaController.update
);


router.delete(
  '/:id',
  authenticateToken,
  upload.none(),
  mahasiswaController.remove
);



export default router;