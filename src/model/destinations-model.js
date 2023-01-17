export default class DestinationsModel {

  #destinations = null;

  constructor(destinations) {
    this.#destinations = destinations;
  }

  get destinations() {
    return this.#destinations;
  }
}
