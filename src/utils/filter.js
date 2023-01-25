import { FilterType } from '../const.js';
import { isFutureEvent } from './dates.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFutureEvent(point.dateFrom, point.dateTo)),
};

const getFilteredPointsByType = (points, filterType) => {
  switch (filterType) {
    case FilterType.EVERYTHING:
      return points;
    case FilterType.FUTURE:
      return points.filter((point) => isFutureEvent(point.dateFrom, point.dateTo));
    default:
      return points;
  }
};

export {filter, getFilteredPointsByType};
