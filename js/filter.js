'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;
  var ads = [];

  var filterHouseType = document.querySelector('#housing-type');
  var filterRoom = document.querySelector('#housing-rooms');
  var filterGuest = document.querySelector('#housing-guests');
  var filterPrice = document.querySelector('#housing-price');

  var filterWiFi = document.querySelector('#filter-wifi');
  var filterDishwasher = document.querySelector('#filter-dishwasher');
  var filterParking = document.querySelector('#filter-parking');
  var filterWasher = document.querySelector('#filter-washer');
  var filterElevator = document.querySelector('#filter-elevator');
  var filterConditioner = document.querySelector('#filter-conditioner');


  var houseTypeFilter = function (item) {
    var matchHouseType = item.offer.type === filterHouseType.value;
    return filterHouseType.value === 'any' ? true : matchHouseType;
  };

  var roomsFilter = function (item) {
    var matchPrice = item.offer.rooms === +filterRoom.value;
    return filterRoom.value === 'any' ? true : matchPrice;
  };

  var guestsFilter = function (item) {
    var matchGuests = item.offer.guests === +filterGuest.value;
    return filterGuest.value === 'any' ? true : matchGuests;
  };

  var priceFilter = function (item) {
    var price = item.offer.price;

    if (filterPrice.value === 'any') {
      return true;
    }

    if (filterPrice.value === 'low') {
      return price <= 10000;
    } else if (filterPrice.value === 'middle') {
      return price >= 10000 && price <= 50000;
    } else {
      return price >= 50000;
    }

  };

  var featuresFilter = function (item) {
    var wifiPresented = item.offer.features.indexOf('wifi') !== -1;
    var dishwasherPresented = item.offer.features.indexOf('dishwasher') !== -1;
    var parkingPresented = item.offer.features.indexOf('parking') !== -1;
    var washerPresented = item.offer.features.indexOf('washer') !== -1;
    var elevatorPresented = item.offer.features.indexOf('elevator') !== -1;
    var conditionerPresented = item.offer.features.indexOf('conditioner') !== -1;

    var result = true;
    result = result && (filterWiFi.checked ? wifiPresented : true);
    result = result && (filterDishwasher.checked ? dishwasherPresented : true);
    result = result && (filterParking.checked ? parkingPresented : true);
    result = result && (filterWasher.checked ? washerPresented : true);
    result = result && (filterElevator.checked ? elevatorPresented : true);
    result = result && (filterConditioner.checked ? conditionerPresented : true);

    return result;
  };


  var adsFilter = function () {
    var filteredArr = ads.filter(function (item) {
      return (houseTypeFilter(item) &&
               roomsFilter(item) &&
               guestsFilter(item) &&
               priceFilter(item) &&
               featuresFilter(item));
    });

    window.pin(filteredArr);

    var pinsContainer = document.querySelector('.map__pins');
    window.card(pinsContainer, filteredArr);
  };

  window.filter = {
    changeHundler: window.util.debounce(function () {
      adsFilter();
    }, DEBOUNCE_INTERVAL)
  };

  function loadHandler(data) {
    ads = data.slice(0);
  }

  window.backend.load(loadHandler, window.util.errorHundler);

})();
