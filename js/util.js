'use strict';

(function() {

	window.util = {
		ENTER_KEYCODE: 13,
		ESC_KEYCODE: 27,

		getRandomValue: function(array) {
			return array[Math.floor( Math.random() * array.length )];
		},

		getRandomNumber: function(min, max) {
			var maxInterval = max;
			var minInterval = min;

			if (!arguments[1]) {
				maxInterval = min;
				minInterval = 0;
			}

			return Math.floor( minInterval + Math.random() * ( maxInterval + 1 - minInterval ) );
		},

		getRandomArray: function(array) {
			var arr = [];
			var randomLength = Math.floor( Math.random() * array.length );

			if (randomLength === 0) {
				randomLength = 1;
			}
			
			for (var i = 0 ; i < randomLength ; i++) {
				arr.push(array[i]);
			}

			return arr;
		},

		// получить координаты элемента относительно окна с прокруткой
		getCoords: function(elem) {
			var box = elem.getBoundingClientRect();

		  return {
		    top: box.top + pageYOffset,
		    left: box.left + pageXOffset
		  };
		}, 

		errorHundler: function(errorMessage) {
			var error = document.querySelector('.error-box');
			var errorMessageBox = document.querySelector('.error-box__message');
			var errorClose = document.querySelector('.error-box__close');
			
			errorMessageBox.textContent = errorMessage;

			error.classList.remove('hidden');

			errorClose.addEventListener('click', function(event) {
				error.classList.add('hidden');
			});
		}
	}

})();