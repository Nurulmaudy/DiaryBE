import { db } from '../index.js';
import { diaries } from '../diaries.js';

async function seedDiaries() {
  await db.insert(
    diaries as any
  ).values([

    {
      mahasiswaId: 1,

      title: 'Kangen Masa Lalu',

      content:
        'kalo lagi banyak deadline gini, pengennya cuma balik ke orang yang selalu ngerti tanpa kita minta untuk dingertiin.',

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