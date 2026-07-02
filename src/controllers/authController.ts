import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';

import { db } from '../db/index.js';
import { mahasiswa } from '../db/mahasiswa.js';

const SECRET_KEY = 'RAHASIA_NEGARA';

interface JwtPayload {
  id: number;
  nama: string;
}

export const register = async (req: Request, res: Response) => {
  try {
    const { nim, nama, jurusan, semester, pinHash  } = req.body;

    const hashedPassword = await bcrypt.hash(pinHash, 10);

    await db.insert(mahasiswa as any).values({
      nim,
      nama,
      jurusan,
      semester,
      pinHash: hashedPassword
    });

    res.status(201).json({
      message: 'Register berhasil'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Gagal register',
      error
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { nim, nama, jurusan, semester, pinHash } = req.body;

    const result = await db
      .select()
      .from(mahasiswa)
      .where(eq(mahasiswa.nim, nim))
      .limit(1);

    const user = result[0];

    if (!user) {
      return res.status(401).json({
        message: 'Nim tidak ditemukan'
      });
    }

    const isMatch = await bcrypt.compare(
      pinHash,
      user.pinHash
    );

    if (!isMatch) {
      return res.status(401).json({
        message: 'Password salah'
      });
    }

    const payload: JwtPayload = {
      id: user.id,
      nama: user.nama
    };

    const token = jwt.sign(
      payload,
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({
      token
    });
  } catch (error) {
    res.status(500).json({
      message: 'Gagal login',
      error
    });
  }
};