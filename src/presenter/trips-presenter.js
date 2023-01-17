//import NewPointView from '../view/add-new-point-view.js';
import PointListView from '../view/points-view.js';
import ListEmptyView from '../view/empty-view.js';
import NoFutureEventView from '../view/no-future-event-view.js';
import { render, RenderPosition } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import ListSortView from '../view/sort-view.js';
import { getSort } from '../mock/sort.js';
import { getSortedPoints } from '../utils/sort.js';
import { SortType } from '../const.js';
import ListFilterView from '../view/filter-view.js';
import { FilterType } from '../const.js';
import { getFilteredPointsByType } from '../utils/filter.js';

export default class TripPresenter {
  #pointListComponent = new PointListView();

  #listPoints = [];
  #pointsContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
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


  constructor({pointsContainer, pointsModel, destinationsModel, filteredPoints, headerFiltersElement}) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#filteredPoints = filteredPoints;
    this.#headerContainer = headerFiltersElement;
  }

  init() {
    this.#listPoints = [...this.#pointsModel.points];
    this.#sourcedBoardPoints = [...this.#pointsModel.sortedPointsByDay];

    this.#renderPointsList();
    this.#renderSort();
    this.#renderFilter();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderPointsList() {
    if (!this.#filteredPoints.length) {
      this.#renderEmptyList();
      return ;
    }

    render(this.#pointListComponent, this.#pointsContainer);
    //пока скрыла новую точку, чтобы потом добавлять ее по клику. еще не разобралась как
    //render(new NewPointView(), this.#pointListComponent.element, RenderPosition.AFTERBEGIN);

    //это я таким способом только смогла придумать, как изначально отсортировать точки модели и отрисовать их в нужном порядке

    this.#sourcedBoardPoints.forEach((point) => this.#renderPoint(point));
  }

  #renderEmptyList() {
    render(this.#emptyListComponent, this.#pointsContainer);
  }

  #renderNoFutureEventMsg() {
    render(this.#noFutureEventComponent, this.#pointsContainer);
  }

  #renderPoint(point) {

    const pointPresenter = new PointPresenter ({
      pointsContainer: this.#pointListComponent.element,
      onModeChange: this.#handleModeChange,
      destinationsModel: this.#destinationsModel
    });

    pointPresenter.init(point, this.#destinationsModel);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderSort() {
    this.#sortComponent = new ListSortView ({
      sortOption: this.#sortOptions,
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
    this.#sortPoints(this.#currentSortType);
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
    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderSortedPoints();
  };

  #renderSortedPoints () {
    this.#filteredPoints.forEach((point) => this.#renderPoint(point));
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#filteredPoints = getSortedPoints(this.#filteredPoints, SortType.DAY);
        break;
      case SortType.PRICE:
        this.#filteredPoints = getSortedPoints(this.#filteredPoints, SortType.PRICE);
        break;
      default:
        this.#filteredPoints = [...this.#sourcedBoardPoints];
    }
    this.#currentSortType = sortType;
  }

  #clearPointList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }
}

