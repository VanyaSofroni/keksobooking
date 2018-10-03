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

		for (var i = 0; i < noticeFormFieldset.length; i++) {
			noticeFormFieldset[i].removeAttribute('disabled');
		}

		window.filter.changeHudler();
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

			var mapPinMainSizeX = 62;
			var mapPinMainSizeY = 84;

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

			var coordAddressX = Math.round(window.util.getCoords(mapPinMain).left + mapPinMainSizeX / 2);
			var coordAddressY = Math.round(window.util.getCoords(mapPinMain).top + mapPinMainSizeY);
			
			showAddress(coordAddressX, coordAddressY);
		};

		var onMouseUp = function(upEvent) {
			upEvent.preventDefault();

			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		};

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	});

	var showAddress = function(x, y) {
		var address = document.querySelector('#address');
		var messageCoords = x + ', ' + y;

		address.value = messageCoords;
	};

})();