import { getDestination } from '../mock/destination.js';

const DESTINATIONS_COUNT = 6;

export default class DestinationsModel {

  #destinations = Array.from({ length: DESTINATIONS_COUNT }, (value, index) => getDestination(index));

  get destinations() {
    return this.#destinations;
  }
}
