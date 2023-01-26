import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import { render } from './framework/render.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic bla1bla2bla3';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple';

const headerContainer = document.querySelector('.trip-main');
const headerFiltersElement = document.querySelector('.trip-controls__filters');
const mainEventsElement = document.querySelector('.trip-events');


const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filterContainer: headerFiltersElement,
  filterModel,
  pointsModel
});

const tripPresenter = new TripPresenter({
  pointsContainer: mainEventsElement,
  pointsModel,
  filterModel,
  headerFiltersElement,
  onNewPointDestroy: handleNewPointFormClose
});

const newPointButtonComponent = new NewPointButtonView({
  onNewPointButtonClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  tripPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

filterPresenter.init();
tripPresenter.init();

pointsModel.init()
  .finally(() => {
    render(newPointButtonComponent, headerContainer);
  });

