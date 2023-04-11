const POSTS_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filterElement = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let posts = [];

const sortByRandom = () => Math.random() - 0.5;
const sortByComments = (postA, postB) => postB.comments.length - postA.comments.length;

const getFilteredPosts = () => {
  switch(currentFilter) {
    case Filter.RANDOM:
      return [...posts].sort(sortByRandom).slice(0, POSTS_COUNT);
    case Filter.DISCUSSED:
      return [...posts].sort(sortByComments).slice(0, POSTS_COUNT);
    default:
      return [...posts];
  }
};

const initFilterClick = (cb) => {
  filterElement.addEventListener ('click', (evt) => {
    if(!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    const clickedFilter = evt.target;
    if (clickedFilter.id === currentFilter) {
      return;
    }
    filterElement
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    clickedFilter.classList.add('img-filters__button--active');
    currentFilter = clickedFilter.id;
    cb(getFilteredPosts());
  });
};

const initSorting = (loadedPosts, cb) => {
  filterElement.classList.remove('img-filters--inactive');
  posts = [...loadedPosts];
  initFilterClick(cb);
};

export {initSorting, getFilteredPosts};
