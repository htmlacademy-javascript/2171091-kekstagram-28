const previewContainer = document.querySelector('.img-upload__preview-container');
const uploadedImage = previewContainer.querySelector('.img-upload__preview img');
const effectsContainer = document.querySelector('.effects');
const slider = previewContainer.querySelector('.effect-level__slider');
const sliderContainer = previewContainer.querySelector('.img-upload__effect-level');
const effectLevel = previewContainer.querySelector('.effect-level__value');

const FILTERS = [
  {name: 'original', filter: 'none', min: 0, max: 100, step: 1, unit: ''},
  {name: 'chrome', filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: ''},
  {name: 'sepia', filter: 'sepia', min: 0, max: 1, step: 0.1, unit: ''},
  {name: 'marvin', filter: 'invert', min: 0, max: 100, step: 1, unit: '%'},
  {name: 'phobos', filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px'},
  {name: 'heat', filter: 'brightness', min: 1, max: 3, step: 0.1, unit: ''}
];

const DEFAULT_EFFECT = FILTERS[0];
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
    uploadedImage.style.filter = 'none';
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
    start: currentEffect.max
  });
};

const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  updateSlider();
};

//переключать фильтры
const onEffectsChange = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    currentEffect = FILTERS.find((effect) => effect.name === evt.target.value);
    uploadedImage.className = `effects__preview--${evt.target.value}`;
    updateSlider();
  }
};
//двигать ползунок
const onSliderUpdate = () => {
  const sliderValue = slider.noUiSlider.get();
  uploadedImage.style.filter = `${currentEffect.filter}(${slider.value}${currentEffect.unit})`;
  effectLevel.value = sliderValue;
};

effectsContainer.addEventListener('change', onEffectsChange);
slider.noUiSlider.on('update', onSliderUpdate);

export {resetEffects};
