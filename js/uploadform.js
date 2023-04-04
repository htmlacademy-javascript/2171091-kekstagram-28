import {isEscapeKey} from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadCancel = uploadForm.querySelector('#upload-cancel');
const inputHashtag = uploadForm.querySelector('.text__hashtags');
const inputComment = uploadForm.querySelector('.text__description');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
/*переменные для слайдера (потом сделать)
const previewContainer = uploadForm.querySelector('.img-upload__preview-container');
const increaseValue = previewContainer.querySelector('.scale__control--bigger');
const decreaseValue = previewContainer.querySelector('.scale__control--smaller');*/

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.getElementById('upload-select-image').reset();
  }
};
/*функция показать редактор*/
const showEditor = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};
/*функция скрыть редактор*/
const closeEditor = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

/*показать редактор*/
uploadFile.addEventListener('change', (evt) => {
  evt.preventDefault();
  showEditor();
});

/*закрыть редактор крестиком*/
uploadCancel.addEventListener('click', () => {
  closeEditor ();
  uploadFile.value = '';
});

export {uploadForm, inputHashtag, inputComment};
