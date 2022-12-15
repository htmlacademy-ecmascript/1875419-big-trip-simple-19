import { getRandomArrayElement, getRandomInteger } from './util.js';

import { OFFERS_TITLES, MIN_OFFER_PRICE, MAX_OFFER_PRICE, MIN_OFFERS, MAX_OFFERS, POINTS_TYPES } from '../const.js';

const getOffer = (index) => ({
  id: ++index,
  title: getRandomArrayElement(OFFERS_TITLES),
  price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
});

const getOfferByType = () => ({
  type: getRandomArrayElement(POINTS_TYPES),
  offers: Array.from({ length: getRandomInteger(MIN_OFFERS, MAX_OFFERS) }, (value, index) => getOffer(index))
});

export {getOfferByType};
