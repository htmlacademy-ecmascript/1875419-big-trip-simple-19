import { SortType } from '../const.js';
import dayjs from 'dayjs';

const options = {
  [SortType.DAY]: () => false,
  [SortType.EVENT]: () => true,
  [SortType.TIME]: () => false,
  [SortType.PRICE]: () => false,
  [SortType.OFFERS]: () => true,
};


const getSortedPoints = (points, sortType) => {
  switch (sortType) {
    case SortType.DAY:
      return points.sort((pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom)));
    case SortType.PRICE:
      return points.sort((pointA, pointB) => pointB.basePrice - pointA.basePrice);
    case SortType.TIME:
      return points.sort((pointA, pointB) => dayjs(pointB.dateTo).diff(pointB.dateFrom) - dayjs(pointA.dateTo).diff(pointA.dateFrom));
    default:
      return points;
  }
};

const isPriceEqual = (priceA, priceB) => (priceA === null && priceB === null) || (priceA === priceB);


const getSort = () =>
  Object.entries(options).map(([optionName, isDisabledOption]) => ({
    name: optionName,
    disabled: isDisabledOption(optionName),
  }));


export {
  options,
  getSortedPoints,
  isPriceEqual,
  getSort
};
