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

// hide and show options in form - for pet type
$(document).ready(function() {
  $('input[type=radio][name=petChoice]').change(function() {
    if (this.value == 'Other') {
      $('.other-expand').removeClass('hide-other');
    } else {
      $('.other-expand').addClass('hide-other');
    }
  });
});

// hide and show options in form - for chip
$(document).ready(function() {
  $('input[type=radio][name=chipped]').change(function() {
    if (this.value == 'Yes') {
      $('.chip-expand').removeClass('hide-chip');
    } else {
      $('.chip-expand').addClass('hide-chip');
    }
  });
});

// hide and show options in form - for tag
$(document).ready(function() {
  $('input[type=radio][name=tag]').change(function() {
    if (this.value == 'Yes') {
      $('.tag-expand').removeClass('hide-tag');
    } else {
      $('.tag-expand').addClass('hide-tag');
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

// Hamburger menu
$(function($) {
  $('.menu-btn').click(function() {
    $('.responsive-menu').toggleClass('expand');
  });
});

// Add tooltip to + and - icons for social media icons in dashboard
$('.plus-minus').hover(function() {
  $('.popup').toggleClass('show-popup');
  $('.popup').toggleClass('hide-popup');
});
