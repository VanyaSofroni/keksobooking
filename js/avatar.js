'use strict';

(function () {

  var fileChooser = document.querySelector('.upload input[type=file]');
  var preview = document.querySelector('.notice__preview img');

  // Drag-and-Drop
  var dropZone = document.querySelector('.drop-zone');

  var preventDefaultsHandler = function (e) {
    e.preventDefault();
    e.stopPropagation();
  };

  var dropZoneHighlightHandler = function () {
    dropZone.classList.add('highlight');
  };

  var dropZoneUnhighlightHandler = function () {
    dropZone.classList.remove('highlight');
  };

  var fileDropHandler = function (e) {
    var file;
    file = (!e.dataTransfer) ? fileChooser.files[0] : e.dataTransfer.files[0];

    var fileName = file.name.toLowerCase();

    var matches = window.util.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    } else {
      window.util.errorHundler('Ошибка! Вы загружаете файл с недопустимым расширением.');
    }
  };

  // Убираем стандартное поведение у событий
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
    dropZone.addEventListener(eventName, preventDefaultsHandler);
  });

  // Выделяем область в которую перемещаем файл
  ['dragenter', 'dragover'].forEach(function (eventName) {
    dropZone.addEventListener(eventName, dropZoneHighlightHandler);
  });

  // Убираем выделение из области, в которую не перемещаем файл
  ['dragleave', 'drop'].forEach(function (eventName) {
    dropZone.addEventListener(eventName, dropZoneUnhighlightHandler);
  });

  dropZone.addEventListener('drop', fileDropHandler);
  fileChooser.addEventListener('change', fileDropHandler);

  // Обнуляем аватар, после отправки на сервер
  var defaultPhotoAvatar = 'img/muffin.png';

  window.defaultAvatar = function () {
    preview.src = defaultPhotoAvatar;
  };

})();
