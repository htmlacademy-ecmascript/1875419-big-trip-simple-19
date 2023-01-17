import { getRandomInteger, getRandomArrayElement } from './utils.js';
import { POINTS_TYPES } from './const.js';
import { getRandomDates } from './dates.js';
import { getOffersByTypes } from './offer.js';
import { nanoid } from 'nanoid';

const MIN_ARRAY_LENGTH = 0;
const BasePrice = {
  MIN: 200,
  MAX: 2000
};

const POINTS_COUNT = 5;

//если делать это в функции, то генерируются разные массивы в представлениях point-view и edit-point-view, что ломает правильное отображение данных на странице. Поэтому  удобнее оставить данные в костантах.
const offersByType = getOffersByTypes();

const getRandomOffersIds = () => {
  const randomOffers = getRandomArrayElement(offersByType).offers;

  const ids = [];
  const lengthOfArray = getRandomInteger(MIN_ARRAY_LENGTH, randomOffers.length);
  while (ids.length <= lengthOfArray) {
    const currentElement = getRandomInteger(MIN_ARRAY_LENGTH, randomOffers.length);
    if (!ids.includes(currentElement)) {
      ids.push(currentElement);
    }
  }

  return ids;
};

const getRandomPoint = () => {
  const randomDates = getRandomDates();

  return {
    basePrice: getRandomInteger(BasePrice.MIN, BasePrice.MAX),
    dateFrom: randomDates.dateFrom,
    dateTo: randomDates.dateTo,
    destination: getRandomInteger(1,6),
    id: nanoid(),
    offers: getRandomOffersIds(),
    type: getRandomArrayElement(POINTS_TYPES)
  };
};

const getMockPoints = () => (Array.from({length: POINTS_COUNT}, (value, index) => getRandomPoint(index)));

export {getRandomPoint, offersByType, getMockPoints};
