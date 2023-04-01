import {createComments} from './data.js';
const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarComments = createComments();

const pictureFragment = document.createDocumentFragment();

similarComments.forEach(({url, likes, comments}) => {
  const createdPicture = pictureTemplate.cloneNode(true);
  createdPicture.querySelector('.picture__img').src = url;
  createdPicture.querySelector('.picture__likes').textContent = likes;
  createdPicture.querySelector('.picture__comments').textContent = comments.length;
  pictureFragment.appendChild(createdPicture);

});

picturesList.appendChild(pictureFragment);
