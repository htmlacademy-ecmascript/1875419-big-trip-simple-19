import ListFilterView from './view/list-filter-view.js';
import TripPresenter from './presenter/trips-presenter.js';
import PointsModel from './model/points-model.js';
import { render } from './framework/render.js';
import { generateFilter } from './mock/filter.js';
import { generateSort } from './mock/sort.js';
import ListSortView from './view/list-sort-view.js';
import { getRandomPoint } from './mock/point.js';

const POINTS_COUNT = 5;

const mockPoints = Array.from({length: POINTS_COUNT}, (value, index) => getRandomPoint(index));

const headerFiltersElement = document.querySelector('.trip-controls__filters');
const mainEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel(mockPoints);
const tripPresenter = new TripPresenter({
  pointsContainer: mainEventsElement,
  pointsModel
});

const points = pointsModel.points;

const filters = generateFilter(points);
render(new ListFilterView({filters}), headerFiltersElement);

const sortedPoints = generateSort(points);
render(new ListSortView(sortedPoints), mainEventsElement);

tripPresenter.init();


