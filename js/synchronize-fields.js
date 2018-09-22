'use strict';

(function () {
	
	window.synchronizeFields = function(changedElement, dependentElement, changedValues, dependentValues, callback) {

		changedElement.addEventListener('change', function(event) {
			var i = changedValues.indexOf(changedElement.value); // метод indexOf(searchElement[, fromIndex]) возвращает номер элемента searchElement в массиве
			callback(dependentElement, dependentValues[i]);
		});

	}

})();