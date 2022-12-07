import ListSortView from '../view/list-sort-view.js';
import EditPointView from '../view/edit-point-view.js';
import NewPointView from '../view/add-new-point-view.js';
import TripEventView from '../view/trip-event-view.js';
import TripListView from '../view/trip-list-view.js';
import {render} from '../render.js';

const ROUTE_POINTS = 3;
const mainEventsElement = document.querySelector('.trip-events');


export default class TripPresenter {
  tripListComponent = new TripListView();

  constructor({tripContainer}) {
    this.tripContainer = tripContainer;
  }

  init() {
    render(new ListSortView(), mainEventsElement);
    render(this.tripListComponent, mainEventsElement);
    render(new NewPointView(), this.tripListComponent.getElement(), 'afterbegin');
    render(new EditPointView(), this.tripListComponent.getElement(), 'afterbegin');
    for (let i = 0; i < ROUTE_POINTS; i++) {
      render(new TripEventView, this.tripListComponent.getElement());
    }
  }
}
