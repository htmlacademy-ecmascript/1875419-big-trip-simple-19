export default class DestinationsAndOffersModel {

  #destinations = null;
  #offersByType = null;

  constructor(destinations, offersByType) {
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
