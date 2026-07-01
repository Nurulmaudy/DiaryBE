import type { Request, Response, NextFunction } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { mahasiswa } from '../db/schema.js';

export async function getAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = await db.select().from(mahasiswa);
    return res.json(data);
  } catch (error) {
    return next(error);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'id harus berupa angka' });
    }

    const data = await db.select().from(mahasiswa).where(eq(mahasiswa.id, id)).limit(1);
    if (!data[0]) {
      return res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });
    }

    return res.json(data[0]);
  } catch (error) {
    return next(error);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { nim, nama, jurusan, semester, pin_hash } = req.body;

    // Validasi field wajib berdasarkan ERD CampusDiary
    if (!nim || !nama || !jurusan || semester === undefined || !pin_hash) {
      return res.status(400).json({ 
        message: 'nim, nama, jurusan, semester, dan pin_hash wajib diisi' 
      });
    }

    // Insert data mahasiswa baru
    await db.insert(mahasiswa).values({ 
      nim, 
      nama, 
      jurusan, 
      semester: Number(semester), 
      pin_hash 
    });
    
    // Mengambil data berdasarkan NIM (karena bersifat UNIQUE pada ERD)
    const created = await db.select().from(mahasiswa).where(eq(mahasiswa.nim, nim)).limit(1);

    return res.status(201).json(created[0]);
  } catch (error) {
    return next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'id harus berupa angka' });
    }

    const { nim, nama, jurusan, semester, pin_hash } = req.body;
    if (!nim || !nama || !jurusan || semester === undefined || !pin_hash) {
      return res.status(400).json({ 
        message: 'nim, nama, jurusan, semester, dan pin_hash wajib diisi' 
      });
    }

    const existing = await db.select().from(mahasiswa).where(eq(mahasiswa.id, id)).limit(1);
    if (!existing[0]) {
      return res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });
    }

    // Update data mahasiswa
    await db.update(mahasiswa)
      .set({ 
        nim, 
        nama, 
        jurusan, 
        semester: Number(semester), 
        pin_hash 
      })
      .where(eq(mahasiswa.id, id));
      
    const updated = await db.select().from(mahasiswa).where(eq(mahasiswa.id, id)).limit(1);
    return res.json(updated[0]);
  } catch (error) {
    return next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'id harus berupa angka' });
    }

    const existing = await db.select().from(mahasiswa).where(eq(mahasiswa.id, id)).limit(1);
    if (!existing[0]) {
      return res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });
    }

    await db.delete(mahasiswa).where(eq(mahasiswa.id, id));
    return res.json({ message: 'Mahasiswa berhasil dihapus' });
  } catch (error) {
    return next(error);
  }
}