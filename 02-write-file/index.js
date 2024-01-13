// const readableStream = fs.createReadStream(textLocation, 'utf-8');
// readableStream.on('data', (chunk) => console.log(chunk));

const fs = require('fs');
const readline = require('readline');
const path = require('path');

const textLocation = path.join(__dirname, 'text.txt');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const outputStream = fs.createWriteStream(textLocation, { flags: 'a' });

rl.setPrompt('enter text \n');

rl.on('line', (line) => {
  if (line.toLowerCase() === 'exit') {
    process.exit();
  } else {
    outputStream.write(line + '\n');
  }
});

rl.prompt();

process.on('exit', () => {
  console.log('Thank you for participating!');
  outputStream.close();
  rl.close();
});

// rl.question('enter any text', (line) => {
//   if (line.toLowerCase() === 'exit') {
//     rl.close();
//     outputStream.close();
//     console.log('Thank you for participating');
//   }
//   outputStream.write(line + '\n');
// });
