import TripPresenter from './presenter/trips-presenter.js';
import PointsModel from './model/points-model.js';
import { getMockPoints } from './mock/point.js';
import DestinationsAndOffersModel from './model/destinations-and-offers-model.js';
import { getDestination } from './mock/destination.js';
import { getOffersByTypes } from './mock/offer.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import { render, RenderPosition } from './framework/render.js';

const DESTINATIONS_COUNT = 6;

const headerContainer = document.querySelector('.trip-main');
const headerFiltersElement = document.querySelector('.trip-controls__filters');
const mainEventsElement = document.querySelector('.trip-events');

const mockPoints = getMockPoints();
const destinations = Array.from({ length: DESTINATIONS_COUNT }, (value, index) => getDestination(index));
const offersByType = getOffersByTypes();

const pointsModel = new PointsModel(mockPoints);
const destinationsAndOffersModel = new DestinationsAndOffersModel(destinations, offersByType);
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filterContainer: headerFiltersElement,
  filterModel,
  pointsModel
});

const tripPresenter = new TripPresenter({
  pointsContainer: mainEventsElement,
  pointsModel,
  destinationsAndOffersModel,
  filterModel,
  headerFiltersElement,
  onNewPointDestroy: handleNewPointFormClose
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  tripPresenter.createPoint(destinationsAndOffersModel);
  newPointButtonComponent.element.disabled = true;
}

render(newPointButtonComponent, headerContainer, RenderPosition.BEFOREEND);
filterPresenter.init();
tripPresenter.init();


