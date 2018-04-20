(function setDefaultPage( page ){
  var loc = window.location;
  var url = loc.href;
  if( loc.search == '') return loc.href = url + '?page=1';
})()

function setPage( page ){
  var loc = window.location;
  var url = loc.href;
  var pageExp = /page=\d/; 
  if( pageExp.test( url ) ){
    url = url.replace( pageExp, 'page=' + page);
    loc.href = url;
  }
}


