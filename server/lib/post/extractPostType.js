const extractPostType = ( postType ) => {
  if( postType == 'LOST' || postType == 'FOUND') return postType;
  let type = undefined;
  if( postType ){
    switch( postType ){
      case 'lostpet':
        type = 'LOST';
        break;
      case 'lostpets':
        type = 'LOST';
        break;
      case 'foundpet':
        type = 'FOUND';
        break;
      case 'foundpets':
        type = 'FOUND';
        break;
      default:
        type = undefined;
        break;
    }
  }
  return type;
}

module.exports = extractPostType;