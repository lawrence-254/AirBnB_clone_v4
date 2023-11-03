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
$.ajax({
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  type: 'POST',
  data: '{}',
  dataType: 'json',
  contentType: 'application/json',
  success: function (data) {
    let pDict;
    data.sort((first, second) => first.name.localeCompare(second.name));
    let placesSection = $('SECTION.places');
    data.forEach((pDict) => {
      let place = $('<article></article>');

      let title = $('<div class="title"></div>');
      title.append($('<h2></h2>').text(pDict.name));
      title.append($('<div class="price_by_night"></div>').text(pDict.price_by_night));

      let info = $('<div class="information"></div>');
      let guests = $('<div class="max_guest"></div>');
      guests.append(pDict.max_guest + ' Guests');

      let rooms = $('<div class="number_rooms"></div>');
      rooms.append(pDict.number_rooms + ' Bedrooms');

      let bathrooms = $('<div class="number_bathrooms">');
      bathrooms.append(pDict.number_bathrooms + ' Bathroom');

      let desc = $('<div class="description"></div>').text(pDict.description);

      info.append(guests, rooms, bathrooms);
      place.append(title, info, desc);
      placesSection.append(place)
     });
   }
 });
