import express  from 'express';
import { sql } from 'drizzle-orm';
import mahasiswaRoutes from './routes/mahasiswaRoutes.js';
import moodsRoutes from './routes/moodsRoutes.js';
import diariesRoutes from './routes/diariesRoutes.js';
import { db } from './db/index.js';
import { errorHandler } from './middlewares/handler.js';
import authRoutes from './routes/authRoutes.js';
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get('/health', async (_req, res) => {
    try{
        await db.execute(sql`SELECT 1`);
        return res.json({ status: 'ok'});
    } catch {
        return res.status(500).json({ status : 'error' });
    }
})

app.use('/mahasiswa', mahasiswaRoutes);
app.use('/diaries', diariesRoutes);
app.use('/moods', moodsRoutes);
app.use('/auth', authRoutes);

app.use(errorHandler);
app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
})