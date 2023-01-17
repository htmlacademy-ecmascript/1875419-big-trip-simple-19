import TripPresenter from './presenter/trips-presenter.js';
import PointsModel from './model/points-model.js';
import { getFilter } from './mock/filter.js';
import { getMockPoints } from './mock/point.js';
import DestinationsModel from './model/destinations-and-offers-model.js';
import { getDestination } from './mock/destination.js';
import { getOffersByTypes } from './mock/offer.js';

const DESTINATIONS_COUNT = 6;

const mockPoints = getMockPoints();
const headerFiltersElement = document.querySelector('.trip-controls__filters');
const mainEventsElement = document.querySelector('.trip-events');
const destinations = Array.from({ length: DESTINATIONS_COUNT }, (value, index) => getDestination(index));
const offersByType = getOffersByTypes();

const pointsModel = new PointsModel(mockPoints);
const destinationsModel = new DestinationsModel(destinations, offersByType);

const points = pointsModel.points;
const filteredPoints = getFilter(points);

const tripPresenter = new TripPresenter({
  pointsContainer: mainEventsElement,
  pointsModel,
  destinationsModel,
  filteredPoints,
  headerFiltersElement
});

tripPresenter.init();


