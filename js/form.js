'use strict';

(function () {

  // Синхронизация времени заезда и выезда (в обе стороны)
  var checkinTime = document.body.querySelector('#timein');
  var checkoutTime = document.body.querySelector('#timeout');

  var syncValues = function (element, value) {
    element.value = value;
  };

  window.synchronizeFields(checkinTime, checkoutTime, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  window.synchronizeFields(checkoutTime, checkinTime, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);


  // Односторонняя синхронизация типа жилья и минимальной цены
  var apartmentType = document.body.querySelector('#type');
  var pricePerNight = document.body.querySelector('#price');

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  window.synchronizeFields(apartmentType, pricePerNight, ['flat', 'bungalo', 'house', 'palace'], [1000, 0, 5000, 10000], syncValueWithMin);


  // Односторонняя синхронизация типа жилья и минимальной цены
  var roomQuantity = document.body.querySelector('#room_number');
  var guestsQuantity = document.body.querySelector('#capacity');

  window.synchronizeFields(roomQuantity, guestsQuantity, ['1', '2', '3', '100'], ['1', '2', '3', '0'], syncValues);


  // Отправить данные на сервер
  var form = document.querySelector('.notice__form');

  var loadHandler = function () {
    setTimeout(function () {
      form.reset();
      window.defaultAvatar();
      window.defaultGallery();
    }, 1000);
  };

  form.addEventListener('submit', function (event) {
    window.backend.save(new FormData(form), loadHandler, window.util.errorHundler);
    event.preventDefault();
  });

  // Очистка формы по кнопке
  var reset = document.querySelector('.form__reset');
  reset.addEventListener('click', function (e) {
    e.preventDefault();
    form.reset();
    window.defaultAvatar();
    window.defaultGallery();
  });

})();
