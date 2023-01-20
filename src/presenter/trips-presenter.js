//import NewPointView from '../view/add-new-point-view.js';
import PointListView from '../view/points-view.js';
import ListEmptyView from '../view/empty-view.js';
import NoFutureEventView from '../view/no-future-event-view.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import ListSortView from '../view/sort-view.js';
import { getSort } from '../mock/sort.js';
import { SortType } from '../const.js';
import ListFilterView from '../view/filter-view.js';
import { FilterType } from '../const.js';
import { getFilteredPointsByType } from '../utils/filter.js';
import { UpdateType, UserAction } from '../const.js';

export default class TripPresenter {
  #pointListComponent = new PointListView();

  #listPoints = [];
  #pointsContainer = null;
  #pointsModel = null;
  #destinationsAndOffersModel = null;
  #allDestinations = null;
  #allOffers = null;
  #sortComponent = null;
  #sortOptions = getSort();
  #currentSortType = SortType.DAY;
  #emptyListComponent = new ListEmptyView;
  #noFutureEventComponent = new NoFutureEventView;
  #pointPresenter = new Map();
  #currentFilterType = FilterType.EVERYTHING;
  #filteredPoints = [];
  #filterComponent = null;
  #sourcedBoardPoints = [];
  #headerContainer = null;


  constructor({pointsContainer, pointsModel, destinationsAndOffersModel, filteredPoints, headerFiltersElement}) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsAndOffersModel = destinationsAndOffersModel;
    this.#allDestinations = this.#destinationsAndOffersModel.destinations;
    this.#allOffers = this.#destinationsAndOffersModel.offersByType;
    this.#filteredPoints = filteredPoints;
    this.#headerContainer = headerFiltersElement;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {

    this.#renderTripRoute();
    //this.#renderSort();
    this.#renderFilter();
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#pointsModel.sortedPointsByDay];
      case SortType.PRICE:
        return [...this.#pointsModel.sortedPointsByPrice];
    }

    return [...this.#pointsModel.sortedPointsByDay];
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    // Здесь будем вызывать обновление модели
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
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

  #renderFilter() {
    this.#filterComponent = new ListFilterView({
      filters: this.#filteredPoints,
      currentFilterType: this.#currentFilterType,
      onFilterChange: this.#handleFilterChange
    });
    this.#filteredPoints = getFilteredPointsByType(this.#pointsModel.points, FilterType.EVERYTHING);
    render(this.#filterComponent, this.#headerContainer);
  }

  #handleFilterChange = (filterType) => {
    if (this.#currentFilterType === filterType) {
      return;
    }
    //По ТЗ при смене фильтра, сортировка по умолчанию
    this.#currentSortType = SortType.DAY;
    // this.#sortPoints(this.#currentSortType);
    this.#filteredPoints = getFilteredPointsByType(this.#pointsModel.points, filterType);
    this.#currentFilterType = filterType;
    this.#clearPointList();
    this.#renderFilteredPoints();
  };

  #renderFilteredPoints () {
    if (!this.#filteredPoints.length) {
      this.#renderNoFutureEventMsg();
      return ;
    }

    this.#filteredPoints.forEach((point) => this.#renderPoint(point));
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearTripRoute();
    this.#renderTripRoute();
  };


  #clearPointList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

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

