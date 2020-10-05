const fileElement = document.querySelector('.overlapped');
const dropArea = document.querySelector('.drop-area');
const preview = document.querySelector('.preview');

function createPreview(eventFiles) {
  const files = Array.from(eventFiles);
  files.forEach((file) => {
    fileElement.value = null;
    const imgContainer = document.createElement('div');
    imgContainer.className = 'img-container';
    const img = document.createElement('img');
    img.className = ('image');
    const close = document.createElement('div');
    close.className = 'close';
    close.innerHTML = '<img src="./close.png" class="close-image" alt="close-button">';

    img.src = URL.createObjectURL(file);
    imgContainer.appendChild(img);
    imgContainer.appendChild(close);
    preview.appendChild(imgContainer);

    close.addEventListener('click', () => {
      close.closest('.img-container').parentNode.removeChild(close.closest('.img-container'));
    });
  });
}

dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropArea.classList.add('dragover');
});

dropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  dropArea.classList.remove('dragover');
  createPreview(e.dataTransfer.files);
});

dropArea.addEventListener('click', () => {
  fileElement.addEventListener('click', () => {
    fileElement.addEventListener('change', (e) => {
      createPreview(e.target.files);
    });
  });

  fileElement.dispatchEvent(new MouseEvent('click'));
});
