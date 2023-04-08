import {isEscapeKey} from './util.js';
import {setDefaultScale} from './zoom.js';
import {resetEffects} from './effects.js';
import {checkUploadForm} from './validation.js';
import {showAlert} from './util.js';
import {sendData} from './api.js';
const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadCancel = uploadForm.querySelector('#upload-cancel');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const submitButton = uploadForm.querySelector('#upload-submit');

const submitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

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
  setDefaultScale();
  resetEffects();
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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = submitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = submitButtonText.IDLE;
};

const setUploadFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (checkUploadForm) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch((err) => {
          showAlert(err.message);
        }
        )
        .finally (unblockSubmitButton);
    }
  });
};

export {showEditor, closeEditor, setUploadFormSubmit};
