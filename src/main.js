import ListFilterView from './view/list-filter-view.js';
import TripPresenter from './presenter/trips-presenter.js';
import {render} from './render.js';

const headerFiltersElement = document.querySelector('.trip-controls__filters');
const mainEventsElement = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter({tripContainer: mainEventsElement});

render(new ListFilterView, headerFiltersElement);

tripPresenter.init();


