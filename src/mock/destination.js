import { getRandomInteger, getRandomArrayElement } from './util.js';
import { MIN_COUNT_DESCRIPTIONS, MAX_COUNT_DESCRIPTIONS, MIN_RANDOM_PIC, MAX_RANDOM_PIC, DESCRIPTIONS, CITIES_NAMES, MAX_PICTURES_COUNT, MIN_PICTURES_COUNT } from '../const.js';

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
