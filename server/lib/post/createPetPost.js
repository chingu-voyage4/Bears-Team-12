const Post = require( '../../models/post.js' );
const User = require( '../../models/user.js' );

const messageToUser = 'There was an error attempting to create your post. Please try again or contact adminstrator';

const createPetPost = ( postData, user, imageFileName, postType ) => {
  return new Promise( ( resolve, reject ) => {
    
    const { 
      title, petChoice, otherType, name, breed, gender, age, chipped, 
      petDesc, lostDate, lastSeenDesc, incidentDesc, foundDate, address, city, 
      state, zipcode, tagInput, areaDesc, color, contact, tags,
    } = postData;
    
    User.findOne(
      {
        _id: user._id
      },
      ( error, user ) => {
        
        if( error ) {
          return reject({
            error:    error,
            message:  messageToUser 
          });
        }
        
        let post = new Post();
        postType = postType.toUpperCase();
        post.title = title;
        post.image = imageFileName;
        post.petType.petCategory = petChoice ? petChoice.toLowerCase() : undefined;
        post.petType.otherType = otherType ? otherType.toLowerCase() : undefined;
        post.breed = breed ? breed.toLowerCase() : undefined;
        post.name = name;
        post.gender = gender ? gender.toLowerCase() : undefined;
        post.age = age;
        post.description = petDesc;  
        post.lastSeenDate = lastSeenDesc;
        post.postType = postType;
        post.tagInput = tagInput;
        post.date = lostDate || foundDate || 'unknown';
        post.tags = tags ? tags.toLowerCase().split(',') : undefined;
        
        if( postType == 'FOUND'){
          post.found = {
            incident: incidentDesc,
            name:   name || 'unknown'
          };
        }
        else {
          post.lost = {
            name: name,
            areaDesc: areaDesc,
            chipped: chipped,
            incident: incidentDesc,
          };
        }
        
        post.location = {
          name: name,
          address:  address,
          city:     city,
          state:    state,
          postal:   zipcode
        }
        
        let postUsername = '';
        
        postUsername = user.local ? user.local.username : user.facebook ? user.facebook.name : user.google ? user.google.name : user.twitter ? user.twitter.displayName : 'NO ID';
        post.author = {
          id:       user._id,
          username: postUsername,
          contact:  contact
        }
        post.save( error => {
          
          if( error ) {
            return reject({
              error:    error,
              message:  messageToUser 
            });
          }
          
          user.posts.push( post );
          
          user.save( error => {
            
            if( error ) {
              return reject({
                error:    error,
                message:  messageToUser 
              });
            }
            
            return resolve({
              status:   'SUCCESS',
              message:  'Post created successfully'
            });
            
          });
        });
      }
    )
  });
}

module.exports = createPetPost;