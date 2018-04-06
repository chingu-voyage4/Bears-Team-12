const Post = require( '../../models/post.js' );
const User = require( '../../models/user.js' );

const messageToUser = 'There was an error attempting to create your post. Please try again or contact adminstrator';

const createPetPost = ( postData, user, imageFileName, postType ) => {
  return new Promise( ( resolve, reject ) => {
    const { title, petChoice, otherType, name, breed, gender, age, 
                    chipped, desc, lastSeenDate, lastSeenDesc, incidentDetails, 
                    address, city, state, zip } = postData;
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
        post.title = title;
        post.image = imageFileName;
        post.petType.petCategory = petChoice;
        post.petType.otherType = otherType;
        post.breed = breed;
        post.name = name;
        post.gender = gender;
        post.age = age;
        post.desc = desc;  
        post.lastSeenDate = lastSeenDesc;
        post.postType = postType;
        
        if( postType == 'FOUND'){
          post.found = {
            incident: incidentDetails,
            name:   name || 'unknown'
          };
        }
        else {
          post.lost = {
            name: name,
            areaDesc: desc,
            chipped: chipped,
            incident: incidentDetails
          };
        }
        
        post.location = {
          address:  address,
          city:     city,
          state:    state,
          zip:      zip
        }
        
        let postUsername = '';
        
        postUsername = user.local ? user.local.username : user.facebook ? user.facebook.name : user.google ? user.google.name : user.twitter ? user.twitter.displayName : 'NO ID';
        post.author = {
          id:       user._id,
          username: postUsername
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
            resolve({
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