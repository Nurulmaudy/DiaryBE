import { db } from '../index.js';
import { diaries } from '../diaries.js';

async function seedDiaries() {
  await db.insert(
    diaries as any
  ).values([

    {
      mahasiswaId: 1,

      title: 'Capek Kuliah',

      content:
        'Hari ini tugas banyak sekali dan deadline bertabrakan.',

      moodId: 2,

      isPrivate: true
    }
  ]);


  console.log(
    'Seeder diaries selesai dijalankan'
  );
}



seedDiaries()

  .then(() => process.exit(0))

  .catch((error) => {

    console.error(
      'Seeder gagal:',
      error
    );

    process.exit(1);
  });