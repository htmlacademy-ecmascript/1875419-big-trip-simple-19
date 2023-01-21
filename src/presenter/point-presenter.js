import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { render, replace, remove } from '../framework/render.js';
import { isEscapeKey } from '../util.js';
import { UserAction, UpdateType } from '../const.js';
import { isDatesEqual } from '../utils/dates.js';
import { isPriceEqual } from '../utils/sort.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
export default class PointPresenter {
  #pointsContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #allDestinations = null;
  #allOffers = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor({pointsContainer, allDestinations, allOffers, onDataChange, onModeChange}) {
    this.#pointsContainer = pointsContainer;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView ({
      point: this.#point,
      allDestinations: this.#allDestinations,
      allOffers: this.#allOffers,
      onRollupBtnClick: this.#handleEditClick
    });

    this.#pointEditComponent = new EditPointView ({
      point: this.#point,
      allDestinations: this.#allDestinations,
      allOffers: this.#allOffers,
      onFormSubmit: this.#handleFormSubmit,
      onRollupBtnClick: this.#handleRollupBtnClick,
      onDeleteClick: this.#handleDeleteClick
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointsContainer);
      return;
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointsContainer.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditFormToPoint();
    }
  }


  #replacePointToEditForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeydownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeydownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeydownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToEditForm();
  };

  #handleFormSubmit = (update) => {
    // Проверяем, поменялись ли в задаче данные, которые попадают под фильтрацию,
    // а значит требуют перерисовки списка - если таких нет, это PATCH-обновление.
    //к ним относятстя изменение дат и цены
    const isMinorUpdate =
      !isDatesEqual(this.#point.dateFrom, update.dateFrom) ||
      !isDatesEqual(this.#point.dateTo, update.dateTo) ||
      !isPriceEqual(this.#point.basePrice, update.basePrice);


    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
    this.#replaceEditFormToPoint();
  };


  #handleRollupBtnClick = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceEditFormToPoint();
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };
}
