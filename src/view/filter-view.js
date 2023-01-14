import AbstractView from '../framework/view/abstract-view.js';

const renderFilterOptionsTemplate = (filters, currentFilterType) =>
  filters
    .map(
      (filter) =>
        `<div class="trip-filters__filter">
          <input 
          id="filter-${filter.name}" 
          class="trip-filters__filter-input  
          visually-hidden" type="radio" 
          name="trip-filter" 
          value="${filter.name}" 
          ${filter.count === 0 ? 'disabled' : ''} 
          ${filter.name === currentFilterType ? 'checked' : ''} 
          data-sort-type="${filter.name}">
          <label class="trip-filters__filter-label" data-filter-type=${filter.name} for="filter-${filter.name}">${filter.name} ${filter.count}</label>
        </div>`
    )
    .join('');

const createListFilterTemplate = (filters, currentFilterType) =>
  `<form class="trip-filters" action="#" method="get">
    ${renderFilterOptionsTemplate(filters, currentFilterType)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class ListFilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterClick = null;

  constructor({filters, currentFilterType, onFilterChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterClick = onFilterChange;

    this.element.addEventListener('click', this.#filterClickHandler);
  }

  get template() {
    return createListFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterClickHandler = (evt) => {

    if (evt.target.tagName !== 'LABEL') {
      return;
    }
    this.#handleFilterClick(evt.target.dataset.filterType);
  };

}
