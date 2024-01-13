const { readdir, stat } = require('fs').promises;
const path = require('path');

const dirLocation = path.join(__dirname, 'secret-folder');

async function listFiles(location) {
  try {
    const files = await readdir(location, { withFileTypes: true });
    for (const file of files) {
      if (!file.isDirectory()) {
        const filePath = path.join(location, file.name);
        const fileStats = await stat(filePath);

        const { name } = path.parse(file.name);
        const { ext } = path.parse(file.name);
        const fileSize = fileStats.size;

        console.log(`${name}-${ext.slice(1)}-${fileSize / 1000} kb`);
      }
    }
  } catch (err) {
    console.error('Ошибка чтения директории:', err);
  }
}
listFiles(dirLocation);
