import {getRandomArrayElement} from './util.js';
import {getRandomInteger} from './util.js';
import {createRandomIdFromRangeGenerator} from './util.js';

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

/* создаем уникальные Id*/

const getId = createRandomIdFromRangeGenerator(1, COMMENTS_COUNT);
const getUrl = createRandomIdFromRangeGenerator(1, COMMENTS_COUNT);

/* создаем массив*/

const createComment = () => ({
  id: getId(),
  url: 'photos/' + getUrl() + '.jpg',
  avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
  comments: getRandomArrayElement(TEXT),
  likes: getRandomInteger(15, 200),
  name: getRandomArrayElement(NAMES),
});

const createComments = () => Array.from({length: COMMENTS_COUNT}, createComment);
export {createComments};
