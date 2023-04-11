const previewContainer = document.querySelector('.img-upload__preview-container');
const uploadedImage = previewContainer.querySelector('.img-upload__preview img');
const increaseValueScale = previewContainer.querySelector('.scale__control--bigger');
const decreaseValueScale = previewContainer.querySelector('.scale__control--smaller');
const scaleValueField = previewContainer.querySelector('.scale__control--value');

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const setDefaultScale = () => {
  scaleValueField.value = `${String(MAX_SCALE)} %`;
  uploadedImage.style.transform = 'scale(1)';
};

const zoomIn = () => {
  if (parseInt(scaleValueField.value, 10) <= MAX_SCALE - SCALE_STEP) {
    const scaleValueCurrent = parseInt(scaleValueField.value, 10) + SCALE_STEP;
    scaleValueField.value = `${String(scaleValueCurrent)} %`;
    uploadedImage.style.transform = `scale(${scaleValueCurrent / 100})`;
  }
};

const zoomOut = () => {
  if (parseInt(scaleValueField.value, 10) >= MIN_SCALE + SCALE_STEP) {
    const scaleValueCurrent = parseInt(scaleValueField.value, 10) - SCALE_STEP;
    scaleValueField.value = `${String(scaleValueCurrent)} %`;
    uploadedImage.style.transform = `scale(${scaleValueCurrent / 100})`;
  }
};

increaseValueScale.addEventListener('click',() => {
  zoomIn();
});
decreaseValueScale.addEventListener('click',() => {
  zoomOut();
});

export {setDefaultScale, zoomIn, zoomOut, increaseValueScale, decreaseValueScale};
