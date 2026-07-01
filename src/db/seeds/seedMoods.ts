import type { Request, Response, NextFunction } from 'express';
import { db } from '../db/index.js';
import { moods } from '../db/schema.js'; // Pastikan nama table moods sudah diexport di schema

export async function seed(req: Request, res: Response, next: NextFunction) {
  try {
    // Data dummy moods/perasaan berdasarkan kebutuhan aplikasi CampusDiary
    const dummyMoods = [
      { name: 'Senang', emoji: '😊' },
      { name: 'Sedih', emoji: '😢' },
      { name: 'Marah', emoji: '😡' },
      { name: 'Stres Kuliah', emoji: '🤯' },
      { name: 'Santai', emoji: '😎' },
      { name: 'Gemas / Kasmaran', emoji: '🥰' }
    ];

    // Opsi: Bersihkan tabel moods terlebih dahulu jika ingin reset data setiap seed dipanggil
    // await db.delete(moods);

    // Jalankan bulk insert data ke database menggunakan Drizzle
    await db.insert(moods).values(dummyMoods);

    return res.status(201).json({
      message: 'Seeding data moods berhasil dilakukan',
      inserted_count: dummyMoods.length
    });
  } catch (error) {
    return next(error);
  }
}