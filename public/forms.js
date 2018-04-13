// image upload
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

// Set characters counter for comment input
var maxLength = 500;
$('#commentBody').keyup(function() {
  var length = $(this).val().length;
  var length = maxLength - length;
  $('#left').text(length);
});

// hide and show options in form
$(document).ready(function() {
  $('input[type=radio][name=petChoice]').change(function() {
    if (this.value == 'Other') {
      $('.other-input').removeClass('hide-other');
    } else {
      $('.other-input').addClass('hide-other');
    }
  });
});

// Dropdown Header logic

// Show dropdown menu when user clicks the button
function showUserDropdown() {
  $('#userDropdown').toggleClass('show');
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName('dropdown-content');
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};
