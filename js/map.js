'use strict';

(function () {

  var DEFAULT_COORD_X = 748;
  var DEFAULT_COORD_Y = 429;

  var map = document.querySelector('.map');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormFieldset = noticeForm.querySelectorAll('fieldset');
  var mapPinMain = document.querySelector('.map__pin--main');

  // Установить всем элементам формы disabled
  for (var i = 0; i < noticeFormFieldset.length; i++) {
    noticeFormFieldset[i].setAttribute('disabled', 'disabled');
  }

  var showAddress = function (x, y) {
    var messageCoords = x + ', ' + y;

    address.value = messageCoords;
  };

  var address = document.querySelector('#address');

  // Показать начальные координаты в форме, до перемещения pin
  showAddress(DEFAULT_COORD_X, DEFAULT_COORD_Y);

  // При событии mouseup на центральный .map__pin - активировать следующие элементы:
  mapPinMain.addEventListener('mouseup', function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');

    for (var j = 0; j < noticeFormFieldset.length; j++) {
      noticeFormFieldset[j].removeAttribute('disabled');
    }

    var pinsContainer = document.querySelector('.map__pins');

    var loadHandler = function (data) {
      window.pin(data);
      window.card(pinsContainer, data);
    };

    window.backend.load(loadHandler, window.util.errorHundler);
  });

  mapPinMain.addEventListener('mousedown', function (e) {
    e.preventDefault();

    var minBorderY = 130;
    var maxBorderY = 640;
    var startCoords = {
      x: e.clientX,
      y: e.clientY
    };

    var mouseMoveHundler = function (moveEvent) {
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
      }

      if (coordY > maxBorderY) {
        coordY = maxBorderY;
      }

      mapPinMain.style.top = coordY + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

      var coordAddressX = Math.round(window.util.getCoords(mapPinMain).left + mapPinMainSizeX / 2);
      var coordAddressY = Math.round(window.util.getCoords(mapPinMain).top + mapPinMainSizeY);

      showAddress(coordAddressX, coordAddressY);
    };

    var mouseUpHundler = function (upEvent) {
      upEvent.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHundler);
      document.removeEventListener('mouseup', mouseUpHundler);
    };

    document.addEventListener('mousemove', mouseMoveHundler);
    document.addEventListener('mouseup', mouseUpHundler);
  });

})();
