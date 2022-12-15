const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const CITIES_NAMES = ['Chamonix', 'Amsterdam', 'Geneva', 'Paris', 'Berlin', 'Barcelona'];
const OFFERS_TITLES = ['Upgrade to a business class', 'Order Uber', 'Add luggage', 'Switch to comfort', 'Rent a car', 'Add breakfast'];
const POINTS_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];


const MIN_BASE_PRICE = 200;
const MAX_BASE_PRICE = 2000;

const MIN_OFFER_PRICE = 20;
const MAX_OFFER_PRICE = 250;

const MIN_OFFERS = 3;
const MAX_OFFERS = 8;

const MIN_COUNT_DESCRIPTIONS = 1;
const MAX_COUNT_DESCRIPTIONS = 5;

const MIN_DESTINATION_COUNT = 2;
const MAX_DESTINATION_COUNT = 6;
const OFFERS_BY_TYPE_COUNT = 8;

const MIN_RANDOM_PIC = 1;
const MAX_RANDOM_PIC = 50;

const MIN_PICTURES_COUNT = 2;
const MAX_PICTURES_COUNT = 6;

const DATE_FORMAT = 'DD/MM/YY HH:mm';
const DATE_FORMAT_DATE = 'DD MMM';
const DATE_FORMAT_TIME = 'HH:mm';

const TimeRanges = {
  DAYS: {
    MIN: 1,
    MAX: 3
  },
  HOURS: {
    MIN: 1,
    MAX: 10
  },
  MINUTES: {
    MIN: 1,
    MAX: 59
  }
};

export { DESCRIPTIONS,
  MIN_COUNT_DESCRIPTIONS,
  MAX_COUNT_DESCRIPTIONS,
  MIN_RANDOM_PIC,
  MAX_RANDOM_PIC,
  CITIES_NAMES,
  DATE_FORMAT,
  DATE_FORMAT_DATE,
  DATE_FORMAT_TIME,
  TimeRanges,
  MIN_BASE_PRICE,
  MAX_BASE_PRICE,
  MIN_PICTURES_COUNT,
  MAX_PICTURES_COUNT,
  OFFERS_TITLES,
  MIN_OFFERS,
  MAX_OFFERS,
  MAX_OFFER_PRICE,
  MIN_OFFER_PRICE,
  POINTS_TYPES,
  MIN_DESTINATION_COUNT,
  MAX_DESTINATION_COUNT,
  OFFERS_BY_TYPE_COUNT};

