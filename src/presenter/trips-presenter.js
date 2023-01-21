import PointListView from '../view/points-view.js';
import ListEmptyView from '../view/empty-view.js';
import NoFutureEventView from '../view/no-future-event-view.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import ListSortView from '../view/sort-view.js';
import { getSort } from '../mock/sort.js';
import { SortType } from '../const.js';
import { getSortedPoints } from '../utils/sort.js';
import { UpdateType, UserAction } from '../const.js';
import { filter } from '../utils/filter.js';

export default class TripPresenter {
  #pointListComponent = new PointListView();

  #listPoints = [];
  #pointsContainer = null;
  #pointsModel = null;
  #destinationsAndOffersModel = null;
  #allDestinations = null;
  #allOffers = null;
  #filterModel = null;
  #sortComponent = null;
  #sortOptions = getSort();
  #currentSortType = SortType.DAY;
  #emptyListComponent = new ListEmptyView;
  #noFutureEventComponent = new NoFutureEventView;
  #pointPresenter = new Map();
  #headerContainer = null;


  constructor({pointsContainer, pointsModel, destinationsAndOffersModel, filterModel, headerFiltersElement}) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsAndOffersModel = destinationsAndOffersModel;
    this.#allDestinations = this.#destinationsAndOffersModel.destinations;
    this.#allOffers = this.#destinationsAndOffersModel.offersByType;
    this.#filterModel = filterModel;
    this.#headerContainer = headerFiltersElement;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {

    this.#renderTripRoute();
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return getSortedPoints(filteredPoints, SortType.DAY);
      case SortType.PRICE:
        return getSortedPoints(filteredPoints, SortType.PRICE);
    }

    return filteredPoints;
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };


  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deleteTask(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTripRoute();
        this.#renderTripRoute();
        break;
      case UpdateType.MAJOR:
        this.#clearTripRoute({ resetSortType: true });
        this.#renderTripRoute();
        break;
    }
  };


  #renderEmptyList() {
    render(this.#emptyListComponent, this.#pointsContainer);
  }

  #renderNoFutureEventMsg() {
    render(this.#noFutureEventComponent, this.#pointsContainer);
  }

  #renderPoint(point) {

    const pointPresenter = new PointPresenter ({
      pointsContainer: this.#pointListComponent.element,
      allDestinations: this.#allDestinations,
      allOffers: this.#allOffers,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point, this.#allDestinations, this.#allOffers);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderSort() {
    this.#sortComponent = new ListSortView ({
      sortOptions: this.#sortOptions,
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#pointListComponent.element, RenderPosition.AFTERBEGIN);
  }


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearTripRoute();
    this.#renderTripRoute();
  };


  #clearTripRoute({ resetSortType = false } = {}) {

    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#emptyListComponent);
    remove(this.#noFutureEventComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderTripRoute() {

    if (!this.points.length) {
      this.#renderEmptyList();
      return ;
    }
    render(this.#pointListComponent, this.#pointsContainer);
    this.#renderSort();
    this.points.forEach((point) => this.#renderPoint(point));
  }
}

