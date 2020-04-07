import {createProfileTemplate} from './components/profile.js';
import {createMenuTemplate} from './components/menu.js';
import {createSortingTemplate} from './components/sorting.js';
import {createFilmsTemplate} from './components/films.js';
import {createFilmCardTemplate} from './components/film-card.js';
import {createFooterStatisticsTemplate} from './components/footer-statistics.js';
import {createFilmDetailsTemplate} from './components/film-details.js';

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);
const QUANTITY_FILMS = 5;
const QUANTITY_EXTRA_FILMS = 2;
const QUANTITY_EXTRA_CATEGORIES = 2;

const renderElements = (container, template, place = `beforeEnd`) => {
  container.insertAdjacentHTML(place, template);
};


renderElements(siteHeader, createProfileTemplate());
renderElements(siteMain, createMenuTemplate());
renderElements(siteMain, createSortingTemplate());
renderElements(siteMain, createFilmsTemplate());

const mainFilmsList = document.querySelector(`.films-list`).querySelector(`.films-list__container`);
const extraFilmsCategories = document.querySelectorAll(`.films-list--extra`);

for (let i = 0; i < QUANTITY_FILMS; i++) {
  renderElements(mainFilmsList, createFilmCardTemplate());
}

for (let i = 0; i < QUANTITY_EXTRA_CATEGORIES; i++) {
  for (let k = 0; k < QUANTITY_EXTRA_FILMS; k++) {
    const extraFilmsList = extraFilmsCategories[i].querySelector(`.films-list__container`);
    renderElements(extraFilmsList, createFilmCardTemplate());
  }
}

renderElements(siteFooter, createFooterStatisticsTemplate());
