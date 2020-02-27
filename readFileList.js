const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, './');

const readFileList = () => {
  return fs.readdirSync(directoryPath).join('\n');
}

module.exports = readFileList;

