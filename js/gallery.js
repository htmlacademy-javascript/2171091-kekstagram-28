import {renderPictures} from './pictures.js';
import {showBigPicture} from './fullscreen-picture.js';

const pictureContainer = document.querySelector('.pictures');
let pictures = [];

const onPictureClick = (evt) => {
  const renderedPicture = evt.target.closest('[data-picture-id]');
  if(!renderedPicture) {
    return;
  }
  evt.preventDefault();

  const picture = pictures.find(
    (item) => item.id === +renderedPicture.dataset.pictureId);
  showBigPicture(picture);
};

const renderGallery = (currentPictures) => {
  pictures = currentPictures;
  renderPictures(pictures, pictureContainer);
};

pictureContainer.addEventListener('click', onPictureClick);

export {renderGallery};
