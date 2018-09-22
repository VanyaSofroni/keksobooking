'use strict';

(function() {
	var NUMBER_ADS = 8;
	var map = document.querySelector('.map');
	var mapPinTemplate = document.querySelector('#ad-template').content.querySelector('.map__pin');
	var mapPins = document.querySelector('.map__pins');

	var renderMapPin = function(i, ad) {
		var mapPinElement = mapPinTemplate.cloneNode(true);

		mapPinElement.setAttribute('data-count', i);
		mapPinElement.setAttribute('tabindex', 0);
		mapPinElement.style.top = (ad.location.y + 22) + 'px';
		mapPinElement.style.left = (ad.location.x - 5) +'px';
		mapPinElement.querySelector('img').src = ad.author.avatar;

		return mapPinElement;
	}

	window.pin = function(ads) {
		var fragment = document.createDocumentFragment();

		for (var i = 0; i < ads.length; i++) {
			fragment.appendChild(renderMapPin(i, ads[i]));
		}

		mapPins.appendChild(fragment);
	}

})();