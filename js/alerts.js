import {isEscapeKey} from './utils.js';

const successUploadTemplate = document.querySelector('#success').content;
const errorUploadTemplate = document.querySelector('#error').content;
const uploadStatusElement = () => document.querySelector('.success') || document.querySelector('.error');

const closeMessage = () => {
  uploadStatusElement().remove();
  document.removeEventListener('keydown', onMessageEsc);
  document.removeEventListener('click', onOutsideClick);
};

const hideMessage = () => {
  if(uploadStatusElement() !== null){
    closeMessage();
  }
};

function onMessageEsc (evt) {
  if(isEscapeKey(evt)){
    evt.preventDefault();
    closeMessage();
  }
}

function onOutsideClick (evt) {
  if(evt.target === uploadStatusElement()) {
    closeMessage();
  }
}

const showErrorMessage = () => {
  const errorMessage = errorUploadTemplate.cloneNode(true);
  const errorMessageFragment = document.createDocumentFragment();
  errorMessageFragment.append(errorMessage);
  document.body.append(errorMessageFragment);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', hideMessage);
  document.addEventListener('keydown', onMessageEsc);
  document.addEventListener('click', onOutsideClick);
};

const showSuccessMessage = () =>{
  const successMessage = successUploadTemplate.cloneNode(true);
  const successMessageFragment = document.createDocumentFragment();
  successMessageFragment.append(successMessage);
  document.body.append(successMessageFragment);
  const successButton = document.querySelector('.success__button');
  successButton.addEventListener('click', hideMessage);
  document.addEventListener('keydown', onMessageEsc);
  document.addEventListener('click', onOutsideClick);
};

export {showErrorMessage, showSuccessMessage};
