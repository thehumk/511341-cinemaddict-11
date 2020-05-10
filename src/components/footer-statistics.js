import AbstractComponent from './abstract-component.js';

const createFooterStatisticsTemplate = (quantityFilms) => {
  return (
    `<section class="footer__statistics">
      <p>${quantityFilms} movies inside</p>
    </section>`
  );
};

export default class FooterStatistics extends AbstractComponent {
  constructor(quantityFilms) {
    super();
    this._quantityFilms = quantityFilms;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._quantityFilms);
  }
}
