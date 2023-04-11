import {renderGallery} from './gallery.js';
import {showAlert, debounce} from './util.js';
import {closeEditor, setUploadFormSubmit} from './upload-form.js';
import {getData} from './api.js';
import {initSorting, getFilteredPosts} from './sorting.js';
import './upload-file.js';

getData()
  .then((data) => {
    const debouncedRenderPictures = debounce(renderGallery);
    initSorting(data, debouncedRenderPictures);
    renderGallery(getFilteredPosts());
  })
  .catch((err) => {
    showAlert(err.message);
  });

setUploadFormSubmit(closeEditor);
