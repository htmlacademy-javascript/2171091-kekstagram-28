import {isEscapeKey} from './util.js';
import {setDefaultScale, zoomIn, zoomOut, increaseValueScale, decreaseValueScale} from './zoom.js';
import {resetEffects, onEffectsChange} from './effects.js';
import {pristine} from './validation.js';
import {showErrorMessage, showSuccessMessage} from './alerts.js';
import {sendData} from './api.js';
const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadCancel = uploadForm.querySelector('#upload-cancel');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const submitButton = uploadForm.querySelector('#upload-submit');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');
const submitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.getElementById('upload-select-image').reset();
    uploadForm.removeEventListener('change', onEffectsChange);
    uploadCancel.removeEventListener('click', closeEditor);
  }
};

const onFocusTextInput = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onBlurTextInput = () => {
  document.addEventListener('keydown', onDocumentKeydown);
};

const addFocusAndBlur = (target) => {
  target.addEventListener('focus', onFocusTextInput);
  target.addEventListener('blur', onBlurTextInput);
};

const removeFocusAndBlur = (target) => {
  target.removeEventListener('focus', onFocusTextInput);
  target.removeEventListener('blur', onBlurTextInput);
};

/*функция показать редактор*/
const showEditor = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  uploadForm.addEventListener('change',onEffectsChange);
  uploadCancel.addEventListener('click', closeEditor);
  addFocusAndBlur(hashtagField);
  addFocusAndBlur(descriptionField);
  setDefaultScale();
};

/*функция скрыть редактор*/
const closeEditor = () => {
  resetEffects();
  setDefaultScale();
  uploadFile.value = '';
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentKeydown);
  uploadForm.removeEventListener('change', closeEditor);
  increaseValueScale.removeEventListener('click', zoomIn);
  decreaseValueScale.removeEventListener('click', zoomOut);
  removeFocusAndBlur(hashtagField);
  removeFocusAndBlur(descriptionField);
};

/*показать редактор*/
uploadFile.addEventListener('change', (evt) => {
  evt.preventDefault();
  showEditor();
});

/*закрыть редактор крестиком*/
uploadCancel.addEventListener('click', () => {
  closeEditor ();
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
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(() =>{
          showSuccessMessage();
        })
        .catch((err) => {
          showErrorMessage(err.message);
        }
        )
        .finally (unblockSubmitButton);
    }
  });
};

export {showEditor, closeEditor, setUploadFormSubmit};
