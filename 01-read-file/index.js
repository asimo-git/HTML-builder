const fs = require('fs');
const path = require('path');
const textLocation = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(textLocation, 'utf-8');
readableStream.on('data', (chunk) => console.log(chunk));
