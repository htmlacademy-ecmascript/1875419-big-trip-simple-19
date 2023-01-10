import AbstractView from '../framework/view/abstract-view.js';

const createNoFutureEventTemplate = () =>
  ('<p class="trip-events__msg">There are no future events now</p>');

export default class NoFutureEventView extends AbstractView {


  get template() {
    return createNoFutureEventTemplate();
  }

}
