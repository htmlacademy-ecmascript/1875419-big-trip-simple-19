import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getDate } from '../utils/dates.js';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


const DEFAULT_START_DATE = dayjs().toISOString();
const DEFAULT_END_DATE = dayjs().add((1),'day').toISOString();

const defaultNewPoint = {
  basePrice: 0,
  dateFrom: DEFAULT_START_DATE,
  dateTo: DEFAULT_END_DATE,
  destination: null,
  id: 0,
  offers: [],
  type: 'taxi'
};

const createEditPointTemplate = (point, destinations, offersByType) => {
  const {type, offers, destination, basePrice, dateFrom, dateTo, id} = point;
  const pointTypeOffers = offersByType.find((offer) => offer.type === type);
  const pointDestination = destinations.find((item) => destination === item.id);
  const destinationName = destination !== null ? pointDestination.name : '';

  const tripOptionsList = offersByType.map((element) =>
    `<div class="event__type-item">
      <input id="event-type-${element.type}-${element.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${element.type}">
      <label class="event__type-label  event__type-label--${element.type}" for="event-type-${element.type}-${element.id}">${element.type}</label>
    </div>
    `).join('');

  const offersTemplate = () => {
    let template = '';
    if (pointTypeOffers) {
      template = pointTypeOffers.offers
        .map((offer) =>
          `<div class="event__offer-selector">
            <input class="event__offer-checkbox  
            visually-hidden" 
            id="event-offer-${type}-${offer.id}" 
            type="checkbox" 
            name="${offer.title}" 
            ${offers.includes(offer.id) ? 'checked' : ''}
            data-offer-id="${offer.id}"
            >
            <label class="event__offer-label" for="event-offer-${type}-${offer.id}">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>
        `).join('');
    }
    return template;
  };

  const destinationToChoose = destinations.map((element) => `<option value="${element.name}"></option>`).join('');

  const offersSectionTemplate = () => {
    let template =
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersTemplate()}
      </div>
    </section>`;

    if (pointTypeOffers.offers.length === 0) {
      template = '';
    }
    return template;
  };

  const picturesTemplate = () => {
    let template = '';
    if (pointDestination) {
      template = pointDestination.pictures
        .map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`)
        .join('');
    }
    return template;
  };

  const destinationSectionTemplate = () => {
    let template = '';
    if (pointDestination) {
      template =
      `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${pointDestination.description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${picturesTemplate()}
          </div>
        </div>
      </section>`;
    }
    return template;
  };

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
                ${tripOptionsList}
            </fieldset>
          </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${id}">
            ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destinationName}" list="destination-list-${id}">
            <datalist id="destination-list-${id}">
            ${destinationToChoose}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${getDate(dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${getDate(dateTo)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">
          ${offersSectionTemplate()}

          ${destinationSectionTemplate()}
        </section>
      </form>
    </li>`
  );
};

export default class EditPointView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleRollupBtnClick = null;
  #allDestinations = null;
  #allOffers = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #handleDeleteClick = null;

  constructor({point = defaultNewPoint, allDestinations, allOffers, onFormSubmit, onRollupBtnClick, onDeleteClick}) {
    super();
    this._setState(EditPointView.parsePointToState(point));
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupBtnClick = onRollupBtnClick;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }


  get template() {

    return createEditPointTemplate(this._state, this.#allDestinations, this.#allOffers);
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupButtonClickHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceChangeHandler);
    this.element.querySelectorAll('.event__offer-selector input')
      .forEach((offer) => offer.addEventListener('change', this.#offerChangeHandler));


    this.#setDateFromPicker();
    this.#setDateToPicker();
  }

  static parsePointToState = (point) => ({ ...point });

  static parseStateToPoint = (state) => ({ ...state });

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupBtnClick();
  };

  #pointTypeChangeHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.tagName === 'INPUT') {
      this.updateElement({
        type: evt.target.value,
        offers: []
      });
    }
  };


  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const destinations = this.#allDestinations;


    if (!evt.target.value) {
      this.updateElement({
        destination: ''
      });
      return;
    }
    const selectedDestination = destinations
      .find((destination) => evt.target.value === destination.name);

    this.updateElement({
      destination: selectedDestination.id
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();

    const price = Number(evt.target.value);
    evt.target.value = isNaN(price) ? this._state.basePrice : price;

    this._setState({
      basePrice: evt.target.value
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    evt.target.toggleAttribute('checked');

    let selectedOffers = this._state.offers;

    if (evt.target.hasAttribute('checked')) {
      selectedOffers.push(+(evt.target.dataset.offerId));
    } else {
      selectedOffers = selectedOffers.filter((id) => id !== +(evt.target.dataset.offerId));
    }

    this._setState({
      offers: selectedOffers
    });
  };

  reset = (point) => {
    this.updateElement(
      EditPointView.parsePointToState(point)
    );
  };

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate
    });
  };

  #setDateFromPicker = () => {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('[name="event-start-time"]'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        minDate: this._state.dateTo,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
        time24hr: true
      }
    );
  };

  #setDateToPicker = () => {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('[name="event-end-time"]'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        minDate: this._state.dateFrom,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
        time24hr: true
      }
    );
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointView.parseStateToPoint(this._state));
  };
}
