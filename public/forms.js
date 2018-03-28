function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    // Set the 'src' to the chosen file
    reader.onload = function(e) {
      $('#photo')
        .attr('src', e.target.result)
        .width(300)
        .height(200);
    };
    reader.readAsDataURL(input.files[0]);

    // Set 'alt' and file name on page to the name of the chosen file
    var name = input.files[0].name;
    $('#FilePath').text(name);
    $('#photo').attr('alt', name.split('.')[0]);
  }
}
