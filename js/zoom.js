const previewContainer = document.querySelector('.img-upload__preview-container');
const uploadedImage = previewContainer.querySelector('.img-upload__preview img'); //загруженная пикча
const increaseValueScale = previewContainer.querySelector('.scale__control--bigger'); //кнопка +
const decreaseValueScale = previewContainer.querySelector('.scale__control--smaller'); //кнопка -
const scaleValueField = previewContainer.querySelector('.scale__control--value'); // масштаб

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const setDefaultScale = () => {
  scaleValueField.value = String(MAX_SCALE) + '%';
  uploadedImage.style.transform = 'scale(1)';
}; // чтобы поставить масштаб 100% вместо масштаба из вёрстки

const zoomIn = () => {
  if (parseInt(scaleValueField.value, 10) <= MAX_SCALE - SCALE_STEP) {
    const scaleValueCurrent = parseInt(scaleValueField.value, 10) + SCALE_STEP;
    scaleValueField.value = String(scaleValueCurrent) + '%';
    uploadedImage.style.transform = `scale(${scaleValueCurrent / 100})`;
  }
};

const zoomOut = () => {
  if (parseInt(scaleValueField.value, 10) >= MIN_SCALE + SCALE_STEP) {
    const scaleValueCurrent = parseInt(scaleValueField.value, 10) - SCALE_STEP;
    scaleValueField.value = String(scaleValueCurrent) + '%';
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
