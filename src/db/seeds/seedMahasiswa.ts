import { db } from '../index.js';
import { mahasiswa } from '../mahasiswa.js';

async function seedMahasiswa()  {
  await db.insert(mahasiswa as any).values([
    {nim: '2024520045', nama: 'tia', jurusan: 'Informatika', semester: '4', pinHash: '111111'}
  ]);

  console.log('Seeder mahasiswa selesai dijalankan');
}

seedMahasiswa()
.then(() => process.exit(0))
.catch((error) => {
  console.error('Seeder gagal:', error);
  process.exit(1);
});