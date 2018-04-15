// Show plus or minus signs in social media for connecting/disconnecting an account
console.log(currentUser); // currentUser is not defined.

$(document).ready(function() {
  console.log(!currentUser.twitter.displayName);
  console.log(!currentUser.google.name);
  console.log(!currentUser.facebook.name);
  if (!currentUser.twitter.displayName) {
    $('#dash-tw-p').addClass('green-social');
    $('#dash-tw-m').addClass('grey-social');
  } else {
    $('#dash-tw-p').addClass('grey-social');
    $('#dash-tw-m').addClass('red-social');
  }
  if (!currentUser.google.name) {
    $('#dash-google-p').addClass('green-social');
    $('#dash-google-m').addClass('grey-social');
  } else {
    $('#dash-google-p').addClass('grey-social');
    $('#dash-google-m').addClass('red-social');
  }
  if (!currentUser.facebook.name) {
    $('#dash-fb-p').addClass('green-social');
    $('#dash-fb-m').addClass('grey-social');
  } else {
    $('#dash-fb-p').addClass('grey-social');
    $('#dash-fb-m').addClass('red-social');
  }
});
