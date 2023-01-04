import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { render, replace } from '../framework/render.js';
import { isEscapeKey } from '../util.js';

export default class PointPresenter {
  #pointsContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #point = null;

  constructor({pointsContainer}) {
    this.#pointsContainer = pointsContainer;
  }

  init(point) {
    this.#point = point;

    this.#pointComponent = new PointView ({
      point: this.#point,
      onRollupBtnClick: this.#handleEditClick
    });

    this.#pointEditComponent = new EditPointView ({
      point: this.#point,
      onFormSubmit: this.#handleFormSubmit,
      onRollupBtnClick: this.#handleRollupBtnClick
    });

    render(this.#pointComponent, this.#pointsContainer);

  }

  #replacePointToEditForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeydownHandler);
  }

  #replaceEditFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeydownHandler);
  }

  #escKeydownHandler = (evt) => {
    if (isEscapeKey) {
      evt.preventDefault();
      this.#replaceEditFormToPoint();
    }
  };

  #handleEditClick() {
    this.#replacePointToEditForm();
  }

  #handleFormSubmit() {
    this.#replaceEditFormToPoint();
  }

  #handleRollupBtnClick() {
    this.#replaceEditFormToPoint();
  }
}
