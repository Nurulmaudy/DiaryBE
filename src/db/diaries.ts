import {
  int,
  mysqlTable,
  varchar,
  text
} from 'drizzle-orm/mysql-core';

import { relations } from 'drizzle-orm';

import { mahasiswa } from './mahasiswa.js';

import { moods } from './moods.js';



export const diaries =
  mysqlTable(
    'diaries',
    {
      id: int('id')
        .autoincrement()
        .primaryKey(),

      title: varchar('title', {
        length: 150
      }).notNull(),

      content: text('content')
        .notNull(),

      mahasiswaId: int(
        'mahasiswa_id'
      )
        .notNull()
        .references(
          () => mahasiswa.id
        ),

      moodId: int(
        'mood_id'
      )
        .notNull()
        .references(
          () => moods.id
        )
    }
  );



export const diariesRelations =
  relations(
    diaries,
    ({ one }) => ({

      mahasiswa: one(
        mahasiswa,
        {
          fields: [
            diaries.mahasiswaId
          ],

          references: [
            mahasiswa.id
          ]
        }
      ),

      moods: one(
        moods,
        {
          fields: [
            diaries.moodId
          ],

          references: [
            moods.id
          ]
        }
      )

    })
  );