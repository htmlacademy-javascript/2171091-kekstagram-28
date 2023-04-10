import {renderPictures} from './pictures.js';
import {showAlert, debounce} from './util.js';
import {closeEditor} from'./uploadform.js';
import {setUploadFormSubmit} from './uploadform.js';
import {getData} from './api.js';
import {initSorting, getFilteredPosts} from './sorting.js';
import './uploadfile.js';
import './fullscreenpicture.js';

const getPictures = getData()
  .then((data) => {
    const debouncedRenderPictures = debounce(renderPictures);
    initSorting(data, debouncedRenderPictures);
    renderPictures(getFilteredPosts());
  })
  .catch((err) => {
    showAlert(err.message);
  });

setUploadFormSubmit(closeEditor);
