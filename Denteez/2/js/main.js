
// Textarea counter
function countChar(val) {
  var len = val.value.length;
  var counterResult = '(' + len + '/1000)'
  if (len >= 500) {
    val.value = val.value.substring(0, 1000);
  } else {
    $('.count').text(counterResult);
  }
};
  


/* The uploader form */
$(function () {
  $(":file").change(function () {
      if (this.files && this.files[0]) {
          var reader = new FileReader();

          reader.onload = imageIsLoaded;
          reader.readAsDataURL(this.files[0]);
      }
  });
});

function imageIsLoaded(e) {
  $('#myImg').attr('src', e.target.result);
  $('#yourImage').attr('src', e.target.result);
  $('.photo-text').addClass('active');
};

// ===================