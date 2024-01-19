const fs = require('fs').promises;
const path = require('path');

// что куда
const projectDist = path.join(__dirname, 'project-dist');
const copyFromCSS = path.join(__dirname, 'styles');
const bundleFolder = path.join(__dirname, 'project-dist');
const copyFromDir = path.join(__dirname, 'assets');
const copyToDir = path.join(__dirname, 'project-dist', 'assets');

// создание страницы из шаблона
async function buildPage(placeForPage) {
  try {
    await fs.mkdir(placeForPage, { recursive: true });
    const templatePath = path.join(__dirname, 'template.html');
    let templateContent = await fs.readFile(templatePath, 'utf-8');

    const dirComponents = path.join(__dirname, 'components');
    const files = await fs.readdir(dirComponents);
    const components = files
      .filter((file) => path.extname(file) === '.html')
      .map((file) => path.parse(file).name);

    for (const component of components) {
      const componentPath = path.join(
        __dirname,
        'components',
        `${component}.html`,
      );
      const componentContent = await fs.readFile(componentPath, 'utf-8');
      templateContent = templateContent.replace(
        `{{${component}}}`,
        componentContent,
      );
    }

    await fs.writeFile(`${placeForPage}/index.html`, templateContent);
    console.log('Success!');
  } catch (error) {
    console.error('Something goes wrong:', error.message);
  }
}

// объединение стилей

async function bundleCSS(cssSource, bundlePath) {
  try {
    const files = await fs.readdir(cssSource);
    const cssFiles = files.filter((file) => path.extname(file) === '.css');

    const bundle = path.join(bundlePath, 'style.css');
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

// перенос assets

async function copyDir(copyFrom, copyTo) {
  try {
    await fs.mkdir(copyTo, { recursive: true });
    const pastFiles = await fs.readdir(copyTo);
    for (const file of pastFiles) {
      await fs.rm(path.join(copyTo, file), { recursive: true });
    }

    const files = await fs.readdir(copyFrom);

    for (const file of files) {
      const copyFromPath = path.join(copyFrom, file);
      const copyToPath = path.join(copyTo, file);
      const stat = await fs.stat(copyFromPath);

      if (stat.isDirectory()) {
        await copyDir(copyFromPath, copyToPath);
      } else {
        await fs.copyFile(copyFromPath, copyToPath);
      }
    }
  } catch (error) {
    console.error('Something goes wrong:', error.message);
  }
}

buildPage(projectDist);
bundleCSS(copyFromCSS, bundleFolder);
copyDir(copyFromDir, copyToDir);
