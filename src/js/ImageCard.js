export default class ImageCard {
  constructor(modelType) {
    this.model = modelType;
    this.fileElement = document.querySelector('.overlapped');
    this.preview = document.querySelector('.preview');
  }

  createPreview(url, id) {
    this.fileElement.value = null;
    const imgContainer = document.createElement('div');
    imgContainer.className = 'img-container';
    const img = document.createElement('img');
    img.className = ('image');
    const close = document.createElement('div');
    close.className = 'close';
    close.innerHTML = '<img src="./close.png" class="close-image" alt="close-button">';

    img.src = url;
    imgContainer.appendChild(img);
    imgContainer.appendChild(close);
    this.preview.appendChild(imgContainer);

    close.addEventListener('click', () => {
      this.model.delete(id);
      close.closest('.img-container').parentNode.removeChild(close.closest('.img-container'));
    });
  }
}
