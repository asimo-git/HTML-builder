const fs = require('fs').promises;
const path = require('path');

async function bundleCSS(cssSource, bundlePath) {
  try {
    const files = await fs.readdir(cssSource);
    const cssFiles = files.filter((file) => path.extname(file) === '.css');
    console.log(cssFiles);

    const bundle = path.join(bundlePath, 'bundle.css');
    let bundleContent = '';

    for (const file of cssFiles) {
      const filePath = path.join(cssSource, file);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      bundleContent += fileContent + '\n';
    }

    await fs.writeFile(bundle, bundleContent);
  } catch (err) {
    console.error('Error:', err);
  }
}

const copyFromDir = path.join(__dirname, 'styles');
const bundleFolder = path.join(__dirname, 'project-dist');

bundleCSS(copyFromDir, bundleFolder);
