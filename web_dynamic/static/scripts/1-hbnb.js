let selectedAmenities = {};
$(document).ready(function () {
  $('div.amenities ul.popover li input').click(function () {
    selectedAmenities = {};
    $('div.amenities ul.popover li input:checked').each(function () {
      let amenity = $(this);
      selectedAmens[amenity.attr('data-id')] = amenity.attr('data-name');
    });
    if (!$.isEmptyObject(selectedAmens)) {
      $('div.amenities h4').text(Object.values(selectedAmens).join(', '));
    } else {
      $('div.amenities h4').text('\xA0');
    }
  });
});
