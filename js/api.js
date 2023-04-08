const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить данные. Попробуйте ещё раз',
};

//код ниже нужен для показа ошибок, но пока не могу разобраться с отправкой

/*const successUploadTemplate = document.querySelector('#success').content;
const errorUploadTemplate = document.querySelector('#error').content;

/*const showSuccessMessage = () => {
  const successMessage = successUploadTemplate.cloneNode(true);
  document.body.append(successMessage);
  const successContainer = document.querySelector('.success');
  const successButton = document.querySelector('.success__button');
  successContainer.addEventListener('click');
  successButton.addEventListener('click');
};

const showErrorAlert = () => {
  const errorAlert = errorUploadTemplate.cloneNode(true);
  document.body.append(errorAlert);
  const errorContainer = document.querySelector('.error');
  const errorButton = document.querySelector('.error__button');
  errorContainer.addEventListener('click');
  errorButton.addEventListener('click');
};*/

const getData = () => fetch(
  `${BASE_URL}${Route.GET_DATA}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    throw new Error(ErrorText.GET_DATA);
  });

const sendData = (body) => fetch(
  `${BASE_URL}${Route.SEND_DATA}`,
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }

  })
  .catch(() => {
    throw new Error(ErrorText.SEND_DATA);
  });

export {getData, sendData};
