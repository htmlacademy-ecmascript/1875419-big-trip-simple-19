import AbstractView from '../framework/view/abstract-view.js';

const renderSortOptionsTemplate = (options, currentSortType) =>
  options
    .map(
      (option) =>
        `<div class="trip-sort__item  trip-sort__item--${option.name}">
          <input 
          id="sort-${option.name}" 
          class="trip-sort__input  
          visually-hidden" type="radio" 
          name="trip-sort" 
          value="${option.name}" 
          ${option.name === currentSortType ? 'checked' : ''} 
          ${option.disabled ? 'disabled' : ''}>
          <label class="trip-sort__btn" data-sort-type=${option.name} for="sort-${option.name}">${option.name}</label>
        </div>`
    )
    .join('');

const createListSortTemplate = (options, currentSortType) =>
  `<form class="trip-events__trip-sort trip-sort" action="#" method="get">
    ${renderSortOptionsTemplate(options, currentSortType)}
  </form>`;

export default class ListSortView extends AbstractView {
  #options = null;
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({sortOption, currentSortType, onSortTypeChange}) {
    super();
    this.#options = sortOption;
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSortType;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createListSortTemplate(this.#options, this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {

    if (evt.target.tagName !== 'LABEL') {
      return;
    }
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };

}
