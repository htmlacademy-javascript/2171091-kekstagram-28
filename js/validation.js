const VALIDHASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const MAXNUMBERHASHTAG = 5;
const MAXLENGTHCOMMENT = 200;
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

/*валидация хэштегов*/

const checkHashtag = (value) => {
  const hashtages = value.split(' ');
  return !value.length ? true : hashtages.every((hashtag) => VALIDHASHTAG.test(hashtag));
};

pristine.addValidator(
  inputHashtag,
  checkHashtag,
  'Ошибка: недопустимый символ, нет # или лишний пробел.'
);

const checkHashtagCount = (value) => {
  const hashTages = value.split(' ');
  return hashTages.length <= MAXNUMBERHASHTAG;
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

/*валидация комментариев*/

const checkComment = (value) => value.length <= MAXLENGTHCOMMENT;

pristine.addValidator(
  inputComment,
  checkComment,
  'Ошибка: максимум 200 символов в комментарии.'
);


export {pristine};
