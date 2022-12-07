import ListFilterView from './view/list-filter-view';
import TripPresenter from './presenter/trips-presenter';
import {render} from './render.js';

const headerFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter({tripContainer: tripEventsElement});

render(new ListFilterView, headerFiltersElement);

tripPresenter.init();


