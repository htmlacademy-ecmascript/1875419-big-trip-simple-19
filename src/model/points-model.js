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


  updatePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
