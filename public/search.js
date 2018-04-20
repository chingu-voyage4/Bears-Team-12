function search( page ){
  var searchForm =  document.getElementById('searchForm');
  searchForm['page'].value = page;
  searchForm.submit();
}