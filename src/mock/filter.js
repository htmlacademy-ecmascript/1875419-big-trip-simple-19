import { filter } from '../utils.js/filter.js';

const generateFilter = (points) =>
  Object.entries(filter).map(([filterName, filterPoints]) => ({
    name: filterName,
    count: filterPoints(points).length,
  }));

export { generateFilter };

