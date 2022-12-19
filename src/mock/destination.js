import { getRandomInteger, getRandomArrayElement } from './util.js';
import { DESCRIPTIONS, CITIES_NAMES } from '../const.js';

const MIN_COUNT_DESCRIPTIONS = 1;
const MAX_COUNT_DESCRIPTIONS = 5;
const MIN_RANDOM_PIC = 1;
const MAX_RANDOM_PIC = 50;
const MIN_PICTURES_COUNT = 2;
const MAX_PICTURES_COUNT = 6;

const getRandomDestinationDescription = () => {
  const count = getRandomInteger(MIN_COUNT_DESCRIPTIONS, MAX_COUNT_DESCRIPTIONS, );
  const descriptionsArr = [];
  for (let i = 0; i <= count; i++) {
    descriptionsArr.push(
      getRandomArrayElement(DESCRIPTIONS));
  }
  return descriptionsArr;
};

const getPicture = () => ({
  src: `https://loremflickr.com/248/152?random=${getRandomInteger(MIN_RANDOM_PIC, MAX_RANDOM_PIC)}`,
  description: getRandomArrayElement(DESCRIPTIONS)
});

const getDestination = (index) =>({
  id: ++index,
  description: getRandomDestinationDescription(),
  name: getRandomArrayElement(CITIES_NAMES),
  pictures: Array.from({ length: getRandomInteger(MIN_PICTURES_COUNT, MAX_PICTURES_COUNT) }, getPicture)
});

export {getRandomDestinationDescription, getDestination};
