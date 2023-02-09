import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic bla1bla2bla8';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip/';

const headerContainer = document.querySelector('.trip-main');
const headerFiltersElement = document.querySelector('.trip-controls__filters');
const mainEventsElement = document.querySelector('.trip-events');


const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  pointsContainer: mainEventsElement,
  tripInfoContainer: headerContainer,
  pointsModel,
  filterModel,
  headerFiltersElement,
  newPointButtonContainer: headerContainer,
});

const filterPresenter = new FilterPresenter({
  filterContainer: headerFiltersElement,
  filterModel,
  pointsModel
});

filterPresenter.init();
tripPresenter.init();
pointsModel.init();


