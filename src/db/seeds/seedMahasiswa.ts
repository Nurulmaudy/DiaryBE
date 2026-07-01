import type { Request, Response, NextFunction } from 'express';
import { db } from '../db/index.js';
import { mahasiswa } from '../db/schema.js';

export async function seed(req: Request, res: Response, next: NextFunction) {
  try {
    // Data dummy mahasiswa berdasarkan ERD CampusDiary
    const dummyMahasiswa = [
      {
        nim: '2201010001',
        nama: 'Ahmad Fauzi',
        jurusan: 'Teknik Informatika',
        semester: 4,
        pin_hash: '$2b$10$vI8aWBnW3fID.vefOEl7G.xyzSampleHash1',
      },
      {
        nim: '2201010002',
        nama: 'Siti Aminah',
        jurusan: 'Sistem Informasi',
        semester: 4,
        pin_hash: '$2b$10$vI8aWBnW3fID.vefOEl7G.xyzSampleHash2',
      },
      {
        nim: '2101020054',
        nama: 'Budi Santoso',
        jurusan: 'Sains Data',
        semester: 6,
        pin_hash: '$2b$10$vI8aWBnW3fID.vefOEl7G.xyzSampleHash3',
      },
    ];

    // Opsi: Bersihkan tabel terlebih dahulu jika diperlukan
    // await db.delete(mahasiswa);

    // Jalankan bulk insert ke database via Drizzle
    await db.insert(mahasiswa).values(dummyMahasiswa);

    return res.status(201).json({
      message: 'Seeding data mahasiswa berhasil dilakukan',
      inserted_count: dummyMahasiswa.length
    });
  } catch (error) {
    return next(error);
  }
}