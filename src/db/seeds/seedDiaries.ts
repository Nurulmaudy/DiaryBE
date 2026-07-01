import { db } from '../index.js';

import { diaries } from '../schema.js';



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
    },

    {
      mahasiswaId: 2,

      title: 'Senang Dapat Nilai Bagus',

      content:
        'Akhirnya presentasi berjalan lancar dan nilainya memuaskan.',

      moodId: 1,

      isPrivate: false
    },

    {
      mahasiswaId: 3,

      title: 'Bingung Masa Depan',

      content:
        'Masih belum yakin setelah lulus ingin kerja atau lanjut kuliah.',

      moodId: 3,

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