import ListSortView from '../view/list-sort-view';
import TripEventListView from '../view/trip-event-list-view';
import EditPointView from '../view/edit-point-view';
import NewPointView from '../view/add-new-point-view';
import {render} from '../render.js';

const ROUTE_POINTS = 3;
const tripEventsElement = document.querySelector('.trip-events');


export default class TripPresenter {
  tripComponent = new TripEventListView();

  constructor({tripContainer}) {
    this.tripContainer = tripContainer;
  }

  init() {
    render(new ListSortView(), tripEventsElement);
    render(new NewPointView(), this.tripComponent.getElement(), 'afterbegin');
    render(new EditPointView(), this.tripComponent.getElement(), 'afterbegin');
    for (let i = 0; i < ROUTE_POINTS; i++) {
      render(this.tripComponent, this.tripContainer);
    }
  }
}
