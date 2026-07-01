import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { diaries } from './diaries.js'; // Impor tabel diaries untuk mendefinisikan relasi

export const moods = mysqlTable('moods', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  emoji: varchar('emoji', { length: 20 }).notNull()
});

// Definisi relasi One-to-Many (Satu mood dapat digunakan di banyak diary)
export const moodsRelations = relations(moods, ({ many }) => ({
  diaries: many(diaries)
}));