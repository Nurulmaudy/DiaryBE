import { Router } from 'express';
import multer from 'multer';
import * as mahasiswaController from '../controllers/mahasiswaController.js';

const router: Router = Router();
const upload = multer();

// Route untuk mengambil semua data mahasiswa
router.get('/', mahasiswaController.getAll);

// Route untuk mengambil satu data mahasiswa berdasarkan ID
router.get('/:id', mahasiswaController.getById);

// Route untuk menambah mahasiswa baru (sesuai ERD CampusDiary)
router.post('/', upload.none(), mahasiswaController.create);

// Route untuk memperbarui data mahasiswa berdasarkan ID
router.put('/:id', upload.none(), mahasiswaController.update);

// Route untuk menghapus data mahasiswa berdasarkan ID
router.delete('/:id', mahasiswaController.remove);

export default router;