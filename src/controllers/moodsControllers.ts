import type { Request, Response, NextFunction } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { moods } from '../db/schema.js'; // Pastikan nama table di schema sesuai

export async function getAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = await db.select().from(moods);
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

    const data = await db.select().from(moods).where(eq(moods.id, id)).limit(1);
    if (!data[0]) {
      return res.status(404).json({ message: 'Mood tidak ditemukan' });
    }

    return res.json(data[0]);
  } catch (error) {
    return next(error);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, emoji } = req.body;

    // Validasi field wajib berdasarkan ERD CampusDiary
    if (!name || !emoji) {
      return res.status(400).json({ message: 'name dan emoji wajib diisi' });
    }

    // Insert data mood baru
    const result = await db.insert(moods).values({ name, emoji }).$returningId();
    
    // Ambil data mood yang baru dibuat berdasarkan ID yang di-return
    const createdId = result[0]?.id;
    const created = await db.select().from(moods).where(eq(moods.id, createdId)).limit(1);

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

    const { name, emoji } = req.body;
    if (!name || !emoji) {
      return res.status(400).json({ message: 'name dan emoji wajib diisi' });
    }

    const existing = await db.select().from(moods).where(eq(moods.id, id)).limit(1);
    if (!existing[0]) {
      return res.status(404).json({ message: 'Mood tidak ditemukan' });
    }

    // Update data mood
    await db.update(moods).set({ name, emoji }).where(eq(moods.id, id));
    
    const updated = await db.select().from(moods).where(eq(moods.id, id)).limit(1);
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

    const existing = await db.select().from(moods).where(eq(moods.id, id)).limit(1);
    if (!existing[0]) {
      return res.status(404).json({ message: 'Mood tidak ditemukan' });
    }

    await db.delete(moods).where(eq(moods.id, id));
    return res.json({ message: 'Mood berhasil dihapus' });
  } catch (error) {
    return next(error);
  }
}