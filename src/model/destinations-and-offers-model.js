import Observable from '../framework/observable.js';

export default class DestinationsAndOffersModel extends Observable {

  #destinations = null;
  #offersByType = null;
  #cities = null;

  constructor(destinations, offersByType) {
    super();
    this.#destinations = destinations;
    this.#offersByType = offersByType;
  }

  get destinations() {
    return this.#destinations;
  }

  get offersByType() {
    return this.#offersByType;
  }

  get cities() {
    const cities = [];
    this.#destinations.forEach((destination) => cities.push(destination.name));

    return cities;
  }
}
