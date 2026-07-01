import type {
  Request,
  Response,
  NextFunction
} from 'express';

import { eq } from 'drizzle-orm';

import { db } from '../db/index.js';

import { diaries } from '../db/schema.js';



export async function getAll(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    const data = await db
      .select()
      .from(diaries);

    return res.json(data);

  } catch (error) {
    return next(error);
  }
}



export async function getById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'id harus berupa angka'
      });
    }

    const data = await db
      .select()
      .from(diaries)
      .where(eq(diaries.id, id))
      .limit(1);

    if (!data[0]) {
      return res.status(404).json({
        message: 'Diary tidak ditemukan'
      });
    }

    return res.json(data[0]);

  } catch (error) {
    return next(error);
  }
}



export async function create(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    const {
      mahasiswaId,
      title,
      content,
      moodId,
      isPrivate
    } = req.body;


    if (
      !mahasiswaId ||
      !title ||
      !content ||
      !moodId
    ) {
      return res.status(400).json({
        message:
          'mahasiswaId, title, content, moodId wajib diisi'
      });
    }


    await db
      .insert(diaries)
      .values({
        mahasiswaId,
        title,
        content,
        moodId,
        isPrivate
      });


    const created = await db
      .select()
      .from(diaries)
      .where(eq(diaries.title, title))
      .limit(1);


    return res.status(201).json(
      created[0]
    );

  } catch (error) {
    return next(error);
  }
}



export async function update(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    const id = Number(
      req.params.id
    );

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message:
          'id harus berupa angka'
      });
    }


    const {
      title,
      content,
      moodId,
      isPrivate
    } = req.body;


    if (
      !title ||
      !content ||
      !moodId
    ) {
      return res.status(400).json({
        message:
          'title, content, moodId wajib diisi'
      });
    }


    const existing =
      await db
        .select()
        .from(diaries)
        .where(
          eq(diaries.id, id)
        )
        .limit(1);


    if (!existing[0]) {
      return res.status(404).json({
        message:
          'Diary tidak ditemukan'
      });
    }


    await db
      .update(diaries)
      .set({
        title,
        content,
        moodId,
        isPrivate
      })
      .where(
        eq(diaries.id, id)
      );


    const updated =
      await db
        .select()
        .from(diaries)
        .where(
          eq(diaries.id, id)
        )
        .limit(1);


    return res.json(
      updated[0]
    );

  } catch (error) {
    return next(error);
  }
}



export async function remove(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    const id = Number(
      req.params.id
    );

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message:
          'id harus berupa angka'
      });
    }


    const existing =
      await db
        .select()
        .from(diaries)
        .where(
          eq(diaries.id, id)
        )
        .limit(1);


    if (!existing[0]) {
      return res.status(404).json({
        message:
          'Diary tidak ditemukan'
      });
    }


    await db
      .delete(diaries)
      .where(
        eq(diaries.id, id)
      );


    return res.json({
      message:
        'Diary berhasil dihapus'
    });

  } catch (error) {
    return next(error);
  }
}