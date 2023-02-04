import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view.js';

const DATE_FORMAT = 'MMM DD';
const MULTIPLE_SYMBOL = '...';
const MAX_CITIES_VISIBLE_COUNT = 3;

const createTripInfoTemplate = (points, offersByType, destinations) => {

  const createTripRouteTemplate = () => {
    const cities = [];
    points.forEach((point) => {
      const pointDestination = destinations.find((city) => point.destination === city.id);
      cities.push(pointDestination.name);
    });
    const startPoint = cities[0];
    const endPoint = cities.at(-1);
    let middlePoint = cities[1];
    let routeString = '';

    if (cities.length > MAX_CITIES_VISIBLE_COUNT) {
      middlePoint = MULTIPLE_SYMBOL;
    }

    switch (cities.length) {
      case 1:
        routeString = startPoint;
        break;
      case 2:
        routeString = `${startPoint} &mdash; ${endPoint}`;
        break;
      default:
        routeString = `${startPoint} &mdash; ${middlePoint} &mdash; ${endPoint}`;
    }

    if (!cities.length) {
      routeString = 'No events';
    }

    return `<h1 class="trip-info__title">
            ${routeString}
          </h1>`;
  };

  const createTripInfoDatesTemplate = () => {

    if (!points.length) {
      return '';
    }

    const startDate = dayjs(points[0].dateFrom);
    const endDate = dayjs(points.at(-1).dateTo);

    let endDateFormat = DATE_FORMAT;

    if (endDate.isSame(startDate, 'month')) {
      endDateFormat = 'DD';
    }

    return `<p class="trip-info__dates">${startDate.format(DATE_FORMAT)}&nbsp;&mdash;&nbsp;${endDate.format(endDateFormat)}</p>`;
  };

  const createTripTotalPriceTemplate = () => {

    let totalPrice = 0;
    points.forEach((point) => {
      totalPrice += +point.basePrice;

      const pointTypeOffer = offersByType.find((offer) => offer.type === point.type);
      if (!pointTypeOffer) {
        return;
      }

      const selectedOffers = pointTypeOffer.offers.filter((offer) => point.offers.includes(offer.id));
      selectedOffers.forEach((offer) => { totalPrice += +offer.price; });
    });

    return `<p class="trip-info__cost">Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span></p>`;
  };

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              ${createTripRouteTemplate()}
              ${createTripInfoDatesTemplate()}
            </div>
            ${createTripTotalPriceTemplate()}
          </section>`;
};

export default class TripInfoView extends AbstractView {
  #points = null;
  #offersByType = null;
  #cities = null;

  constructor(points, offersByType, cities) {
    super();

    this.#points = points;
    this.#offersByType = offersByType;
    this.#cities = cities;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#offersByType, this.#cities);
  }

}
