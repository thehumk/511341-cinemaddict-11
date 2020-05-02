import {createElement} from '../util.js';

export default class FooterStatistics {
  constructor(quantityFilms) {
    this._quantityFilms = quantityFilms;
    this._element = null;
  }

  getTemplate() {
    return (
      `<section class="footer__statistics">
        <p>${this._quantityFilms} movies inside</p>
      </section>`
    );
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
