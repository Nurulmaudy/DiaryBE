import type { Request, Response, NextFunction } from 'express';
import { db } from '../index.js';
import { moods } from '../moods.js'; // Pastikan nama table moods sudah diexport di schema

export async function seedmoods(){
  await db.insert(moods as any).values([
    { name: 'Senang', emoji: '😊' },
    { name: 'Sedih', emoji: '😢' },
    { name: 'Marah', emoji: '😡' },
    { name: 'Stres Kuliah', emoji: '🤯' },
    { name: 'Santai', emoji: '😎' },
    { name: 'Gemas / Kasmaran', emoji: '🥰' }
  ]);

  console.log('Seeder moods selesai dijalannkan');
}

seedmoods()
.then(() => process.exit(0))
.catch((error) => {
  console.error('Seeder gagal:', error);
  process.exit(1);
});