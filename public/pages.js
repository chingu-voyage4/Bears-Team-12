// Set the window to a given page. Added `page=` when not available in url

function setDefaultPage( page ){
  var loc = window.location;
  var url = loc.href;
  if( loc.search == '') return loc.href = url + '?page=' + page;
}

function setPage( page ){
  var loc = window.location;
  var url = loc.href;
  var pageExp = /page=\d/; 
  if( pageExp.test( url ) ){
    url = url.replace( pageExp, 'page=' + page);
    loc.href = url;
  }
  else{
    setDefaultPage( page )
  }
}


