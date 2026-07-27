const Tesseract = require('tesseract.js');
Tesseract.recognize('Hex codes.jpg', 'eng', { logger: m => console.log(m.status + ': ' + m.progress) })
  .then(({ data: { text } }) => {
    console.log('OCR RESULT:\n' + text);
  });
