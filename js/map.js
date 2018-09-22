'use strict';

(function () {

	var map = document.querySelector('.map');
	var noticeForm = document.querySelector('.notice__form');
	var noticeFormFieldset = noticeForm.querySelectorAll('fieldset');
	var mapPinMain = document.querySelector('.map__pin--main');


	// Установить всем элементам формы disabled
	for (var i = 0; i < noticeFormFieldset.length ; i++) {
		noticeFormFieldset[i].setAttribute('disabled', 'disabled');
	};

	// При событии mouseup на центральный .map__pin - активировать следующие элементы:
	mapPinMain.addEventListener('mouseup', function() {
		map.classList.remove('map--faded');
		noticeForm.classList.remove('notice__form--disabled');

		for (var i = 0; i < noticeFormFieldset.length ; i++) {
			noticeFormFieldset[i].removeAttribute('disabled');
		}
	});

	mapPinMain.addEventListener('mousedown', function(event) {
		event.preventDefault();

		var minBorderY = 130;
		var maxBorderY = 640;
		var startCoords = {
			x: event.clientX,
			y: event.clientY
		};

		var onMouseMove = function(moveEvent) {
			moveEvent.preventDefault();

			var shift = {
				x: startCoords.x - moveEvent.clientX,
				y: startCoords.y - moveEvent.clientY
			};

			startCoords = {
				x: moveEvent.clientX,
				y: moveEvent.clientY
			};

			var coordY = mapPinMain.offsetTop - shift.y;

			if (coordY < minBorderY) {
				coordY = minBorderY;
			};

			if (coordY > maxBorderY) {
				coordY = maxBorderY;
			};

			mapPinMain.style.top = coordY + 'px';
			mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px'; 
		};

		var onMouseUp = function(upEvent) {
			var mapPinMainSizeX = 62;
			var mapPinMainSizeY = 84;

			upEvent.preventDefault();

			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);

			var coordAddressX = window.util.getCoords(mapPinMain).left + mapPinMainSizeX / 2;
			var coordAddressY = window.util.getCoords(mapPinMain).top + mapPinMainSizeY;
			
			showAddress(coordAddressX, coordAddressY);
		};

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	});

	var showAddress = function(x, y) {
		var address = document.querySelector('#address');
		var messageCoords = x + ', ' + y;

		address.value = messageCoords;
	};


	function loadHandler(data) {
		window.pin(data);

		var mapPinsContainer = document.querySelector('.map__pins');

		window.card(mapPinsContainer, data);
	};

	window.backend.load(loadHandler, window.util.errorHundler);

})();