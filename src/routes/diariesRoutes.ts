import { Router } from 'express';

import multer from 'multer';

import * as diariesController
from '../controllers/diariesController.js';



const router: Router =
  Router();


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
  upload.none(),
  diariesController.create
);


router.put(
  '/:id',
  upload.none(),
  diariesController.update
);


router.delete(
  '/:id',
  diariesController.remove
);



export default router;