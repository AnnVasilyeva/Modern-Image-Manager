import ImageCard from './ImageCard';
import Model from './Model';

const fileElement = document.querySelector('.overlapped');
const dropArea = document.querySelector('.drop-area');

const model = new Model();

function appendImage(file) {
  const src = `${model.serverURL}?method=image&id=${file.id}`;
  const image = new ImageCard(model);
  image.createPreview(src, file.id);
}

/* отображает сохраненный на сервере изображения при загрузке браузера */
document.addEventListener('DOMContentLoaded', () => {
  model.getAll().then((response) => {
    response.forEach((file) => {
      appendImage(file);
    });
  });
});

dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropArea.classList.add('dragover');
});

/* Для отправки файлов, которые были помещены в drop area */
dropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  dropArea.classList.remove('dragover');
  const formData = new FormData();
  for (let i = 0; i < e.dataTransfer.files.length; i++) {
    formData.append('files[]', e.dataTransfer.files.item(i));
  }
  model.save(formData);
});

/* Для открытия окна выбора файла при клике на дропзону */
dropArea.addEventListener('click', () => {
  fileElement.dispatchEvent(new MouseEvent('click'));
});

/* Для отправки файлов на бэк после их выбора */
fileElement.addEventListener('change', () => {
  const selectedFiles = document.getElementById('files-input').files;
  const formData = new FormData();
  selectedFiles.forEach((file) => {
    formData.append('files[]', file);
  });
  model.save(formData);
});
