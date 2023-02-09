import AbstractView from '../framework/view/abstract-view.js';
import { getDayAndMonth, getTime } from '../utils/dates.js';
import he from 'he';
import Duration from 'dayjs/plugin/duration';
import dayjs from 'dayjs';

dayjs.extend(Duration);
const MILLISECONDS_AMOUNT_IN_HOUR = 3600000;
const MILLISECONDS_AMOUNT_IN_DAY = 86400000;
const MILLISECONDS_AMOUNT_IN_MONTH = 2592000000;

const createPointTemplate = (point, destinations, offersByType) => {
  const {type, offers, destination, basePrice, dateFrom, dateTo, isFavorite} = point;
  const pointTypeOffer = offersByType.find((offer) => offer.type === type);
  const pointDestination = destinations.find((item) => destination === item.id);

  const parseDateTo = dayjs(dateTo);
  const parseDateFrom = dayjs(dateFrom);


  let offersTemplate =
  `<li class="event__offer">
    <span class="event__offer-title">No additional offers</span>
  </li>`;
  if (pointTypeOffer.offers.length !== 0) {
    offersTemplate = pointTypeOffer.offers
      .filter((offer) => offers.includes(offer.id))
      .map((offer) =>
        `<li class="event__offer">
          <span class="event__offer-title">${he.encode(offer.title)}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${he.encode(offer.price.toString())}</span>
        </li>
        `).join('');
  }

  const getEventDuration = (from, to) => {
    const eventDuration = to.diff(from);
    let durationFormat = 'MM[M] DD[D] HH[H] mm[M]';

    if (eventDuration < MILLISECONDS_AMOUNT_IN_MONTH){
      durationFormat = 'DD[D] HH[H] mm[M]';
    }
    if (eventDuration < MILLISECONDS_AMOUNT_IN_DAY) {
      durationFormat = 'HH[H] mm[M]';
    }
    if (eventDuration < MILLISECONDS_AMOUNT_IN_HOUR) {
      durationFormat = 'mm[M]';
    }

    return dayjs.duration(eventDuration).format(durationFormat);
  };


  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom}">${he.encode(getDayAndMonth(dateFrom))}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${he.encode(pointDestination.name)}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${he.encode(getTime(dateFrom))}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${he.encode(getTime(dateTo))}</time>
          </p>
          <p class="event__duration">${getEventDuration(parseDateFrom, parseDateTo)}</p >
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${he.encode(basePrice.toString())}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersTemplate}
        </ul>
        <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
    `);
};

export default class PointView extends AbstractView {
  #point = null;
  #allDestinations = null;
  #allOffers = null;
  #handleRollupBtnClick = null;
  #handleFavoriteClick = null;

  constructor({point, allDestinations, allOffers, onRollupBtnClick, onFavoriteClick}) {
    super();
    this.#point = point;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#handleRollupBtnClick = onRollupBtnClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupBtnClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);

  }

  get template() {
    return createPointTemplate(this.#point, this.#allDestinations, this.#allOffers);
  }

  #rollupBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupBtnClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
