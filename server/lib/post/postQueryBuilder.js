const postQueryBuilder = ( postType, petName, zipCode, petType ) => {
  const query = {
    
  }
  
  if( postType ) query.postType = postType;
  if( petType ) query['petType.petCategory'] = petType;
  if( zipCode ) query['location.postal'] = zipCode;
  
  if( petName ) {
    query.name = petName
  }
  
  //console.log( 'query is: ', query )
  return query;
}

module.exports = postQueryBuilder;