import ImageCard from './ImageCard';

export default class Model {
  constructor() {
    this.serverURL = 'https://image-manager-heroku.herokuapp.com/';
    // this.serverURL = 'http://127.0.0.1:7070/'; локальный сервер для проверки
  }

  async getAll() {
    const images = await fetch(`${this.serverURL}?method=allImages`);
    return images.json();
  }

  async save(data) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', this.serverURL, true);
    const serverUrl = this.serverURL;
    const self = this;
    xhr.onerror = () => {
      console.log('Ошибка');
    };
    xhr.onload = () => {
      const image = new ImageCard(self);
      JSON.parse(xhr.response).forEach((file) => {
        image.createPreview(`${serverUrl}?method=image&id=${file.id}`, file.id);
      });
    };

    return xhr.send(data);
  }

  async delete(id) {
    await fetch(`${this.serverURL}/?method=removeImage&id=${id}`, {
      method: 'POST',
    });
  }
}
