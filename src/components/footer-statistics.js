import {createElement} from '../util.js';

const createFooterStatisticsTemplate = (quantityFilms) => {
  return (
    `<section class="footer__statistics">
      <p>${quantityFilms} movies inside</p>
    </section>`
  );
};

export default class FooterStatistics {
  constructor(quantityFilms) {
    this._quantityFilms = quantityFilms;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._quantityFilms);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
