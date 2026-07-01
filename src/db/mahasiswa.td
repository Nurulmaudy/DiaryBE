import { int, mysqlTable, varchar, timestamp } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { diaries } from './diaries.js'; // Impor tabel diaries untuk relasi

export const mahasiswa = mysqlTable('mahasiswa', {
  id: int('id').autoincrement().primaryKey(),
  nim: varchar('nim', { length: 20 }).notNull().unique(),
  nama: varchar('nama', { length: 100 }).notNull(),
  jurusan: varchar('jurusan', { length: 100 }).notNull(),
  semester: int('semester').notNull(),
  pinHash: varchar('pin_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// Definisi relasi One-to-Many (Satu mahasiswa dapat memiliki banyak diary)
export const mahasiswaRelations = relations(mahasiswa, ({ many }) => ({
  diaries: many(diaries)
}));