const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderPictures = (pictures) => {
  const pictureFragment = document.createDocumentFragment();
  pictures.forEach(({id, url, description, likes, comments}) => {
    const createdPicture = pictureTemplate.cloneNode(true);
    createdPicture.querySelector('.picture__img').src = url;
    createdPicture.querySelector('.picture__likes').textContent = likes;
    createdPicture.querySelector('.picture__comments').textContent = comments.length;
    createdPicture.querySelector('.picture__img').alt = description;
    createdPicture.dataset.pictureId = id;
    pictureFragment.appendChild(createdPicture);
  });
  picturesList.appendChild(pictureFragment);
};
export {renderPictures};
