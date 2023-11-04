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

 $('.container .filters button').click(function () {
    $('article').remove()
    newPlaces.length = 0
    let newPlace = []
    $.ajax(
        {
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify({}),
            success: function (place) {
                for (let l = 0; l < place.length; l++) {
                    $.get( "http://0.0.0.0:5001/api/v1/places/" + place[l].id + "/amenities", function(place_amenities) {
                        amenities_number = 0
                        for (let k = 0; k < Object.keys(amenities).length; k++) {
                            for (let m = 0; m < place_amenities.length; m++) {
                                if (place_amenities[m].id === Object.keys(amenities)[k]) {
                                    amenities_number += 1
                                }
                            }
                        }
                        if (amenities_number === Object.keys(amenities).length) {
                            newPlace.push(place[l]);
                        }
                    })
                }
                $.get( "http://0.0.0.0:5001/api/v1/users/", function(users) {
                    for (let i = 0; i < newPlace.length; i++) {
                        for (let j = 0; j < users.length; j++) {
                            if (users[j].id === newPlace[i].user_id) {
                                newPlaces.push(
                                    `<article>
            <div class="title">
                <h2>
                \#${ newPlace[i].name }
                </h2>
                <div class="price_by_night">
                \$${ newPlace[i].price_by_night }
                </div>
                </div>
                <div class="information">
                <div class="max_guest">
                <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                <br />
                ${ newPlace[i].max_guest } Guests
                </div>
                <div class="number_rooms">
                <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                <br />
                ${ newPlace[i].number_rooms } Bedrooms
                </div>
                <div class="number_bathrooms">
                <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                <br />
                ${ newPlace[i].number_bathrooms } Bathroom
                </div>
                </div>
                <!-- **********************
                USER
                **********************  -->
                <div class="user">
                <strong>Owner: ${ users[j].first_name } ${ users[j].last_name }</strong>
                </div>
                <div class="description">
                ${ newPlace[i].description }
                </div>
                </article>
                        `);
                            }
                        }
                    }
                    $("section.places").append(newPlaces.join(''))
                })
            }
        }
    );
});
