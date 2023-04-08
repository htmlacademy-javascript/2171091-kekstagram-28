//import './data.js';
import {renderPictures} from './pictures.js';
import './fullscreenpicture.js';
import {closeEditor} from'./uploadform.js';
import {setUploadFormSubmit} from './uploadform.js';
import {getData} from './api.js';

const promise = getData()
  .then((data) => {
    const posts = data;
    renderPictures(data);
    return posts;
  });

const pictures = await promise;

setUploadFormSubmit(closeEditor);

export {pictures};
