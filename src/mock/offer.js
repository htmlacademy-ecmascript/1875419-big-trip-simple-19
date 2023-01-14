import { getRandomArrayElement, getRandomInteger } from './utils.js';

import { OFFERS_TITLES, POINTS_TYPES } from './const.js';

const MIN_OFFER_PRICE = 20;
const MAX_OFFER_PRICE = 250;
// const MIN_OFFERS = 3;
// const MAX_OFFERS = 8;
const OFFERS_BY_TYPE_COUNT = 8;

const getOffer = (index) => ({
  id: ++index,
  title: getRandomArrayElement(OFFERS_TITLES),
  price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
});


const getOffers = () => {
  const offersSet = new Set();
  for (let i = 0; i < OFFERS_BY_TYPE_COUNT; i++) {
    offersSet.add(getOffer(i));
  }
  return Array.from(offersSet);
};

const getOffersByTypes = () => {

  const offers = [];

  for (const type of POINTS_TYPES) {
    offers.push({
      type,
      offers: getRandomInteger(0, 4) ? getOffers() : [],
    });
  }
  return offers;
};

export {getOffersByTypes};
