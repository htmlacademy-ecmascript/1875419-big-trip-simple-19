import NewPointView from '../view/add-new-point-view.js';
import PointListView from '../view/points-view.js';
import ListEmptyView from '../view/empty-view.js';
import { render, RenderPosition} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
//import ListSortView from '../view/sort-view.js';


export default class TripPresenter {
  #pointListComponent = new PointListView();

  #pointsContainer = null;
  #pointsModel = null;
  #listPoints = [];
  //  #sortComponent = new ListSortView();
  #emptyListComponent = new ListEmptyView;
  #pointPresenter = new Map();

  constructor({pointsContainer, pointsModel}) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#listPoints = [...this.#pointsModel.points];

    this.#renderPointsList();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderPointsList() {
    if (!this.#listPoints.length) {
      this.#renderEmptyList();
      return;
    }


    render(this.#pointListComponent, this.#pointsContainer);
    render(new NewPointView(), this.#pointListComponent.element, RenderPosition.AFTERBEGIN);

    this.#listPoints.forEach((point) => this.#renderPoint(point));
  }

  #renderEmptyList(){
    render(this.#emptyListComponent, this.#pointsContainer);
  }

  #renderPoint(point) {

    const pointPresenter = new PointPresenter ({
      pointsContainer: this.#pointListComponent.element,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  // #clearPointList() {
  //   this.#pointPresenter.forEach((presenter) => presenter.destroy());
  //   this.#pointPresenter.clear();
  // }
}

