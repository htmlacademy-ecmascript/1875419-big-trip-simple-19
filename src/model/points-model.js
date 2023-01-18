import { getSortedPoints } from '../utils/sort.js';
import { SortType } from '../const.js';
export default class PointsModel {
  #points = null;

  constructor(points) {
    this.#points = points;
  }

  get points() {
    return this.#points;
  }

  get sortedPointsByDay() {
    return getSortedPoints(this.#points, SortType.DAY);
  }

  get sortedPointsByPrice() {
    return getSortedPoints(this.#points, SortType.PRICE);
  }
}
