import { getSortedPoints } from '../utils/sort.js';
import { SortType } from '../const.js';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #points = null;

  constructor(points) {
    super();
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
