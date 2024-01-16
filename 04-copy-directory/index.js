const fs = require('fs').promises;
const path = require('path');

async function copyDir(copyFrom, copyTo) {
  try {
    await fs.mkdir(copyTo, { recursive: true });
    const pastFiles = await fs.readdir(copyTo);
    for (const file of pastFiles) {
      await fs.rm(path.join(copyTo, file));
    }

    const files = await fs.readdir(copyFrom);
    //forEach не работает с асинхронками

    for (const file of files) {
      const copyFromPath = path.join(copyFrom, file);
      const copyToPath = path.join(copyTo, file);

      await fs.copyFile(copyFromPath, copyToPath);
    }

    console.log('Success!');
  } catch (error) {
    console.error('Something goes wrong:', error.message);
  }
}

const copyFromDir = path.join(__dirname, 'files');
const copyToDir = path.join(__dirname, 'files-copy');

copyDir(copyFromDir, copyToDir);
