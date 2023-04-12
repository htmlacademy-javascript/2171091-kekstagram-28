const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_NUMBER_HASHTAG = 5;
const MAX_LENGTH_COMMENT = 200;
const uploadForm = document.querySelector('.img-upload__form');
const inputHashtag = uploadForm.querySelector('.text__hashtags');
const inputComment = uploadForm.querySelector('.text__description');
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

const checkHashtag = (value) => {
  const hashtages = value.split(' ');
  return !value.length ? true : hashtages.every((hashtag) => VALID_HASHTAG.test(hashtag));
};

pristine.addValidator(
  inputHashtag,
  checkHashtag,
  'Ошибка: недопустимый символ, нет # или лишний пробел.'
);

const checkHashtagCount = (value) => {
  const hashTages = value.split(' ');
  return hashTages.length <= MAX_NUMBER_HASHTAG;
};

pristine.addValidator(
  inputHashtag,
  checkHashtagCount,
  'Ошибка: максимальное количество хэш-тегов 5.'
);

const checkHashtagRepeat = (value) => {
  const hashtages = value.toLowerCase().split(' ');
  return new Set(hashtages).size === hashtages.length;
};

pristine.addValidator(
  inputHashtag,
  checkHashtagRepeat,
  'Ошибка: хэш-теги повторяются.'
);

const checkComment = (value) => value.length <= MAX_LENGTH_COMMENT;

pristine.addValidator(
  inputComment,
  checkComment,
  'Ошибка: максимум 200 символов в комментарии.'
);

export {pristine};
