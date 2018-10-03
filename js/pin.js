'use strict';

(function() {

	var NUMBER_ADS = 8;
	var map = document.querySelector('.map');
	var mapPinTemplate = document.querySelector('#ad-template').content.querySelector('.map__pin');
	var mapPins = document.querySelector('.map__pins');
	var selectorMapPin = '.map__pin:not(.map__pin--main)';


	var renderPin = function(i, ad) {
		var mapPinElement = mapPinTemplate.cloneNode(true);

		mapPinElement.setAttribute('data-count', i);
		mapPinElement.setAttribute('tabindex', 0);
		mapPinElement.style.top = (ad.location.y + 22) + 'px';
		mapPinElement.style.left = (ad.location.x - 5) +'px';
		mapPinElement.querySelector('img').src = ad.author.avatar;

		return mapPinElement;
	};

	var removePins = function() {
		while (mapPins.querySelector(selectorMapPin)) {
       mapPins.removeChild(mapPins.querySelector(selectorMapPin));
     }
	};

	window.pin = function(adverts) { 
		var fragment = document.createDocumentFragment();

		for (var i = 0; i < adverts.length; i++) {
			fragment.appendChild(renderPin(i, adverts[i]));
		}

		removePins();
		mapPins.appendChild(fragment);
	};

	var formContainer = document.querySelector('.map__filters');
  formContainer.addEventListener('change', function() {
    window.filter.changeHudler();
  });

})();