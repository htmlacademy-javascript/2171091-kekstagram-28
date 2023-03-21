const NAMES = [
  'Кэрри',
  'Клео',
  'Донна',
  'Флора',
  'Клео',
  'Фэйт',
  'Инез',
  'Фифи',
  'Дэвид',
  'Фредерик',
  'Аллен',
  'Глория',
  'Гилберт',
  'Хьюго',
  'Эндрю',
  'Луис',
  'Берта',
  'Эдуард',
  'Фрэн',
  'Бонни',
  'Джордж',
  'Митч',
  'Флойд',
  'Джерт',
  'Альберто'
];

const TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const COMMENTS_COUNT = 25;

/* генератор чисел*/

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

/* генератор уникальных чисел*/

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

/* случайный элемент массива*/
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

/* создаем уникальные Id*/

const getId = createRandomIdFromRangeGenerator(1, COMMENTS_COUNT);

/* создаем массив*/

const createComment = () => {
  return {
    id: getId(),
    avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
    message: getRandomArrayElement(TEXT),
    name: getRandomArrayElement(NAMES),
  };
};

const Comment = Array.from({length: COMMENTS_COUNT}, createComment);

console.log(Comment);
