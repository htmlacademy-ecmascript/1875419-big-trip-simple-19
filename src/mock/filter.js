import { filter } from '../utils/filter.js';

const getFilter = (points) =>
  Object.entries(filter).map(([filterName, filterPoints]) => ({
    name: filterName,
    count: filterPoints(points).length,
  }));

export { getFilter };

