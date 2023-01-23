import Observable from '../framework/observable.js';

export default class DestinationsAndOffersModel extends Observable {

  #destinations = null;
  #offersByType = null;

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


}
