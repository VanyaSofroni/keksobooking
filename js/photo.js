'use strict';

(function () {

  var previewFile = function (file) {
    var fileName = file.name.toLowerCase();

    var matches = window.util.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.addEventListener('load', function () {
        var div = document.createElement('div');
        div.classList.add('form__photo');

        var img = document.createElement('img');
        img.src = reader.result;
        img.setAttribute('alt', 'photo');

        div.appendChild(img);

        document.querySelector('.form__gallery').appendChild(div);
      });

    } else {
      window.util.errorHundler('Ошибка! Вы загружаете файл с недопустимым расширением.');
    }
  };

  var handleFiles = function (files) {
    var fileList = Array.prototype.slice.call(files);

    fileList.forEach(previewFile);
  };

  // Drag-and-Drop
  var dropZone = document.querySelector('.drop-zone--gallery');

  var preventDefaultsHandler = function (event) {
    event.preventDefault();
    event.stopPropagation();
  };

  var dropZoneHighlightHandler = function () {
    dropZone.classList.add('highlight');
  };

  var dropZoneUnhighlightHandler = function () {
    dropZone.classList.remove('highlight');
  };

  var fileChooser = document.querySelector('.form__photo-container .upload input[type=file]');

  var fileDropHandler = function (e) {
    var files;
    files = (!e.dataTransfer) ? fileChooser.files : e.dataTransfer.files; // Если событие 'drop' то мы работаем с объектом dataTransfer, если 'change', то fileChooser.files

    handleFiles(files);
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

  // Обнуляем gallery, после отправки на сервер
  window.defaultGallery = function () {
    document.querySelector('.form__gallery').innerHTML = '';
  };

})();
