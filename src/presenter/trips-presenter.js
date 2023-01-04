import EditPointView from '../view/edit-point-view.js';
import NewPointView from '../view/add-new-point-view.js';
import PointView from '../view/point-view.js';
import PointListView from '../view/points-view.js';
import ListEmptyView from '../view/empty-view.js';
import { isEscapeKey } from '../util.js';
import { render, replace, RenderPosition} from '../framework/render.js';


export default class TripPresenter {
  #pointListComponent = new PointListView();

  #pointsContainer = null;
  #pointsModel = null;
  #listPoints = [];

  constructor({pointsContainer, pointsModel}) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#listPoints = [...this.#pointsModel.points];

    this.#renderPointsList();
  }

  #renderPointsList() {
    if (!this.#listPoints.length) {
      render(new ListEmptyView(), this.#pointsContainer);
      return;
    }


    render(this.#pointListComponent, this.#pointsContainer);
    render(new NewPointView(), this.#pointListComponent.element, RenderPosition.AFTERBEGIN);

    this.#listPoints.forEach((point) => this.#renderPoint(point));
  }


  #renderPoint(point) {

    function onEscKeyDown(evt) {
      if (isEscapeKey) {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    }

    const pointComponent = new PointView({
      point,
      onRollupBtnClick: () => {
        replacePointToEditForm.call(this);
        document.addEventListener('keydown', onEscKeyDown);
      }
    });

    const pointEditComponent = new EditPointView({
      point,
      onFormSubmit: () => {
        replaceEditFormToPoint.call(this);
        document.removeEventListener('keydown', onEscKeyDown);
      },
      onRollupBtnClick: () => {
        replaceEditFormToPoint.call(this);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    });

    function replacePointToEditForm () {
      replace(pointEditComponent, pointComponent);
    }

    function replaceEditFormToPoint () {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#pointListComponent.element);
  }
}
