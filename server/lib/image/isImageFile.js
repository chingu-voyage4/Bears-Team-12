const readChunk = require('read-chunk');
const fileType = require('file-type');

const isImageFile = ( pathToFile ) => {
  const buffer = readChunk.sync(pathToFile, 0, 4100);
  const { mime } = fileType( buffer );
  if(  mime === 'image/png' || mime === 'image/jpeg') return true;
  return false;
}

module.exports = isImageFile;