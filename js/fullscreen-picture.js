import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const popupScreen = document.querySelector('.big-picture');
const popupScreenClose = popupScreen.querySelector('.big-picture__cancel');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const COMMENTS_PART = 5;
let likesCounter = 0;
let commentsShown = 0;
let commentsArray = [];

let closeBigPicture = null;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const renderPictureData = (({url, likes, comments, description}) => {
  popupScreen.querySelector('.big-picture__img img').src = url;
  popupScreen.querySelector('.likes-count').textContent = likes;
  popupScreen.querySelector('.comments-count').textContent = comments.length;
  popupScreen.querySelector('.big-picture__img img').alt = description;
  popupScreen.querySelector('.social__caption').textContent = description;
});

const renderCommentData = (({avatar, name, message}) => {
  const createdComment = commentTemplate.cloneNode(true);
  createdComment.querySelector('.social__picture').src = avatar;
  createdComment.querySelector('.social__picture').alt = name;
  createdComment.querySelector('.social__text').textContent = message;
  return createdComment;
});

const renderComments = () => {
  commentsShown += COMMENTS_PART;

  if(commentsShown >= commentsArray.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = commentsArray.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = renderCommentData(commentsArray[i]);
    fragment.appendChild(commentElement);
  }

  commentsList.innerHTML = '';
  commentsList.appendChild(fragment);
  commentsCount.innerHTML = `${commentsShown} из <span class="comments-count">${commentsArray.length}</span> комментариев`;
};

const onCommentsLoaderClick = (evt) => {
  evt.preventDefault();
  renderComments();
};

const onLikeClick = () => {
  likesCounter += 1;
  popupScreen.querySelector('.likes-count').textContent = likesCounter;
};

const showBigPicture = (data) => {
  popupScreen.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  popupScreen.querySelector('.likes-count').addEventListener('click', onLikeClick);
  likesCounter = data.likes;
  renderPictureData(data);
  commentsArray = data.comments;
  if (commentsArray.length > 0) {
    renderComments();
  }
};

closeBigPicture = () => {
  popupScreen.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  popupScreen.querySelector('.likes-count').removeEventListener('click', onLikeClick);

};

popupScreenClose.addEventListener('click', () => {
  closeBigPicture ();
});

export {showBigPicture};
