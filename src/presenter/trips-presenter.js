import PointListView from '../view/points-view.js';
import NoPointsView from '../view/no-points-view.js';
import NewPointPresenter from './new-point-presenter.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import ListSortView from '../view/sort-view.js';
import { getSort } from '../mock/sort.js';
import { SortType } from '../const.js';
import { getSortedPoints } from '../utils/sort.js';
import { UpdateType, UserAction, FilterType } from '../const.js';
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
  #newPointPresenter = null;
  #sortComponent = null;
  #sortOptions = getSort();
  #currentSortType = SortType.DAY;
  #pointPresenter = new Map();
  #headerContainer = null;
  #noPointComponent = null;
  #filterType = FilterType.EVERYTHING;


  constructor({pointsContainer, pointsModel, destinationsAndOffersModel, filterModel, headerFiltersElement, onNewPointDestroy}) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsAndOffersModel = destinationsAndOffersModel;
    this.#allDestinations = this.#destinationsAndOffersModel.destinations;
    this.#allOffers = this.#destinationsAndOffersModel.offersByType;
    this.#filterModel = filterModel;
    this.#headerContainer = headerFiltersElement;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {

    this.#renderTripRoute();
  }

  createPoint(destinationsAndOffersModel) {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(destinationsAndOffersModel);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = [...this.#pointsModel.points];
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return getSortedPoints(filteredPoints, SortType.DAY);
      case SortType.PRICE:
        return getSortedPoints(filteredPoints, SortType.PRICE);
    }

    return filteredPoints;
  }


  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
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


  #renderNoPoints() {
    this.#noPointComponent = new NoPointsView({
      filterType: this.#filterType
    });
    render(this.#noPointComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);
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

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };


  #clearTripRoute({ resetSortType = false } = {}) {

    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
    this.#newPointPresenter.destroy();


    remove(this.#sortComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderTripRoute() {
    render(this.#pointListComponent, this.#pointsContainer);

    const pointsCount = this.points.length;

    if (pointsCount === 0) {
      this.#renderNoPoints();
      return;
    }


    this.#renderSort();
    this.points.forEach((point) => this.#renderPoint(point));
  }
}

