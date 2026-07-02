import { db } from '../index.js';
import { mahasiswa } from '../mahasiswa.js';

async function seedMahasiswa()  {
  await db.insert(mahasiswa as any).values([
    {nim: '2024520012', nama: 'naya', jurusan: 'Informatika', semester: '4', pinHash: '112233'}
  ]);

  console.log('Seeder mahasiswa selesai dijalankan');
}

seedMahasiswa()
.then(() => process.exit(0))
.catch((error) => {
  console.error('Seeder gagal:', error);
  process.exit(1);
});