'use strict';

(function () {

  var mapCardTemplate = document.querySelector('#ad-template').content.querySelector('.map__card');
  var mapCardElement = mapCardTemplate.cloneNode(true);

  // Создание карточки с описанием жилья для каждого map__pin по параметру index
  var renderCard = function (ad) {

    mapCardElement.querySelector('h3').textContent = ad.offer.title;
    mapCardElement.querySelector('p small').textContent = ad.offer.address;
    mapCardElement.querySelector('.popup__price').innerHTML = ad.offer.price + '&#x20bd;/ночь';

    var offerType = ad.offer.type;

    switch (offerType) {
      case 'flat':
        mapCardElement.querySelector('h4').textContent = 'Квартира';
        break;
      case 'bungalo':
        mapCardElement.querySelector('h4').textContent = 'Бунгало ';
        break;
      case 'house':
        mapCardElement.querySelector('h4').textContent = 'Дом';
        break;
    }

    mapCardElement.querySelectorAll('p')[2].textContent = ad.offer.rooms + ' комнат(ы) для ' + ad.offer.guests + ' гостей';
    mapCardElement.querySelectorAll('p')[3].textContent = 'Заезд после ' + ad.offer.checkin + ' , выезд до ' + ad.offer.checkout;

    var featureList = mapCardElement.querySelector('.popup__features');

    while (featureList.firstChild) {
      featureList.removeChild(featureList.firstChild);
    }

    for (var i = 0; i < ad.offer.features.length; i++) {
      featureList.insertAdjacentHTML('beforeend', '<li class=\"feature  feature--' + ad.offer.features[i] + '\"></li>');
    }

    mapCardElement.querySelectorAll('p')[4].textContent = ad.offer.description;
    mapCardElement.querySelector('.popup__avatar').src = ad.author.avatar;

    var picturesList = mapCardElement.querySelector('.popup__pictures');

    while (picturesList.firstChild) {
      picturesList.removeChild(picturesList.firstChild);
    }

    for (var j = 0; j < ad.offer.photos.length; j++) {
      picturesList.insertAdjacentHTML('beforeend', '<li> <img src=\"' + ad.offer.photos[j] + '\" style=\"width: 40px; height: 40px;\"> </li>');
    }

    mapCardElement.classList.remove('hidden');


    // Закрытие карточки
    var popupClose = mapCardElement.querySelector('.popup__close');
    popupClose.setAttribute('tabindex', 0); // фокус на popup__close

    var closePopup = function (e) {
      mapCardElement.classList.add('hidden');
      e.target.classList.remove('map__pin--active'); // деактивация элемента .map__pin, который был помечен как активный
    };

    popupClose.addEventListener('click', function (e) {
      closePopup(e);
    });

    popupClose.addEventListener('keydown', function (e) {
      if (e.keyCode === window.util.ENTER_KEYCODE) {
        closePopup(e);
      }
    });

    // Если элемент есть, то закрывать его при нажатии на ESC_KEYCODE
    if (mapCardElement) {
      document.addEventListener('keydown', function (e) {
        if (e.keyCode === window.util.ESC_KEYCODE) {
          closePopup(e);
        }
      });
    }

    return mapCardElement;

  };


  var showCard = function (pinsContainer, ads) {

    var pinsClickHundler = function (e) {
      var target = e.target;
      var mapPinList = document.querySelectorAll('.map__pin');
      var map = document.querySelector('.map');

      while (target !== pinsContainer) { // пока событие не всплывет до контейнера, содержащего все map__pin
        if (target.classList.contains('map__pin')) {
          if (!(target.classList.contains('map__pin--main'))) {
            target.classList.add('map__pin--active');

            var dataCount = target.getAttribute('data-count');
            map.appendChild(renderCard(ads[dataCount]));

            // Удаляем у всех элементов map__pin--active, кроме того который target
            for (var i = 1; i < mapPinList.length; i++) {
              if (mapPinList[i].classList.contains('map__pin--active') && mapPinList[i] !== target) {
                mapPinList[i].classList.remove('map__pin--active');
              }
            }

          }
          return;
        }
        target = target.parentNode;
      }

    };

    pinsContainer.addEventListener('click', pinsClickHundler);
  };

  window.card = function (pinsContainer, ads) {
    showCard(pinsContainer, ads);
  };

})();
