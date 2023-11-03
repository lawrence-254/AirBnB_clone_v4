let selectedAmenities = {};
$(document).ready(function () {
  $('div.amenities ul.popover li input').click(function () {
    selectedAmenities = {};
    $('div.amenities ul.popover li input:checked').each(function () {
      let amenity = $(this);
      selectedAmenities[amenity.attr('data-id')] = amenity.attr('data-name');
    });
    if (!$.isEmptyObject(selectedAmenities)) {
      $('div.amenities h4').text(Object.values(selectedAmenities).join(', '));
    } else {
      $('div.amenities h4').text('\xA0');
    }
  });
});
$.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
  if (data.status === 'OK') {
    $('div#api_status').addClass('available');
  }
});

