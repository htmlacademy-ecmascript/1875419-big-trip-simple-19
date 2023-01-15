import TripPresenter from './presenter/trips-presenter.js';
import PointsModel from './model/points-model.js';
import { getFilter } from './mock/filter.js';
import { getMockPoints } from './mock/point.js';
import DestinationsModel from './model/destinations-model.js';


const mockPoints = getMockPoints();
const headerFiltersElement = document.querySelector('.trip-controls__filters');
const mainEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel(mockPoints);
const destinationsModel = new DestinationsModel();

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


