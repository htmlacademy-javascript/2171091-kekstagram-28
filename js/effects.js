
const EFFECTS = {
  none: {filter: 'none', min: 0, max: 100, step: 1, unit: ''},
  chrome: {filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: ''},
  sepia: {filter: 'sepia', min: 0, max: 1, step: 0.1, unit: ''},
  marvin: {filter: 'invert', min: 0, max: 100, step: 1, unit: '%'},
  phobos: {filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px'},
  heat: {filter: 'brightness', min: 1, max: 3, step: 0.1, unit: ''}
};
const DEFAULT_EFFECT = EFFECTS.none;

const previewContainer = document.querySelector('.img-upload__preview-container');
const uploadedImage = previewContainer.querySelector('.img-upload__preview img');
const effectsContainer = document.querySelector('.effects');
const slider = previewContainer.querySelector('.effect-level__slider');
const sliderContainer = previewContainer.querySelector('.img-upload__effect-level');
const effectLevel = previewContainer.querySelector('.effect-level__value');

let currentEffect = DEFAULT_EFFECT;

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

const checkIfDefault = () => {
  if (currentEffect === DEFAULT_EFFECT) {
    hideSlider();
  } else {
    showSlider();
  }
};

noUiSlider.create(slider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower'
});

const updateSlider = () => {
  checkIfDefault();
  slider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    step: currentEffect.step,
    start: currentEffect.max,
  });
};

const onEffectsChange = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    currentEffect = EFFECTS[evt.target.value];
    uploadedImage.className = `effects__preview--${evt.target.value}`;
    updateSlider();
  }
};

const onSliderUpdate = () => {
  const sliderValue = slider.noUiSlider.get();
  uploadedImage.style.filter = `${currentEffect.filter}(${sliderValue}${currentEffect.unit})`;
  effectLevel.value = sliderValue;
};

effectsContainer.addEventListener('change', onEffectsChange);

slider.noUiSlider.on('update', onSliderUpdate);

const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  uploadedImage.style.filter = '';
  uploadedImage.className = '';
  updateSlider();
  effectsContainer.removeEventListener('change', onEffectsChange);
};

export {resetEffects, onEffectsChange};
