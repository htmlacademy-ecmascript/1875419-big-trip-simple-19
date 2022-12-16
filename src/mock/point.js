import { getRandomInteger, getRandomArrayElement } from './util.js';
import { POINTS_TYPES } from '../const.js';
import { getRandomDates } from './dates.js';
import { getDestination } from './destination.js';
import { getOfferByType } from './offer.js';

const MIN_ARRAY_LENGTH = 0;
const MIN_DESTINATION_COUNT = 2;
const MAX_DESTINATION_COUNT = 6;
const OFFERS_BY_TYPE_COUNT = 8;
const MIN_BASE_PRICE = 200;
const MAX_BASE_PRICE = 2000;

const offersByType = Array.from({ length: OFFERS_BY_TYPE_COUNT }, getOfferByType);
const destinations = Array.from({ length: getRandomInteger(MIN_DESTINATION_COUNT, MAX_DESTINATION_COUNT) }, (value, index) => getDestination(index));

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

const getRandomPoint = (count) => {
  const randomDates = getRandomDates();

  return {
    basePrice: getRandomInteger(MIN_BASE_PRICE, MAX_BASE_PRICE),
    dateFrom: randomDates.dateFrom,
    dateTo: randomDates.dateTo,
    destination: getRandomArrayElement(destinations).id,
    id: count,
    isFavorite: false,
    offers: getRandomOffersIds(),
    type: getRandomArrayElement(POINTS_TYPES)
  };
};

export {getRandomPoint, offersByType, destinations};
