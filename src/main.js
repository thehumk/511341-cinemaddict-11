import {createProfileTemplate} from './components/profile.js';
import {createMenuTemplate} from './components/menu.js';
import {createSortingTemplate} from './components/sorting.js';
import {createFilmsTemplate} from './components/films.js';
import {createFilmCardTemplate} from './components/film-card.js';
import {createFooterStatisticsTemplate} from './components/footer-statistics.js';
import {createFilmDetailsTemplate, createGenreFilmTemplate} from './components/film-details.js';
import {films, createRandomFilms} from './mock/films.js';
import {comments, createRandomComments} from './mock/comments.js';
import {createFilmCommentsTemplate} from './components/comments.js';
import {profile, setProfileRating, QUANTITY_ALL_FILMS} from './mock/profile.js';

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);

const QUANTITY_RENDER_FILMS = 5;
const QUANTITY_EXTRA_FILMS = 2;
const QUANTITY_EXTRA_CATEGORIES = 2;
let showingTasksCount = QUANTITY_RENDER_FILMS;

const renderElements = (container, template, place = `beforeEnd`) => {
  container.insertAdjacentHTML(place, template);
};

createRandomFilms();
createRandomComments();
setProfileRating();

renderElements(siteHeader, createProfileTemplate(profile));
renderElements(siteMain, createMenuTemplate());
renderElements(siteMain, createSortingTemplate());
renderElements(siteMain, createFilmsTemplate());

const mainFilmsList = document.querySelector(`.films-list`).querySelector(`.films-list__container`);
const extraFilmsCategories = document.querySelectorAll(`.films-list--extra`);

for (let i = 0; i < QUANTITY_RENDER_FILMS; i++) {
  renderElements(mainFilmsList, createFilmCardTemplate(films[i]));
}

const renderFilmsList = () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount += QUANTITY_RENDER_FILMS;

  films.slice(prevTasksCount, showingTasksCount).forEach((elem) => {
    renderElements(mainFilmsList, createFilmCardTemplate(elem));
  });

  if (showingTasksCount >= films.length) {
    showMoreButton.remove();
  }
};

const showMoreButton = document.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, renderFilmsList);

for (let i = 0; i < QUANTITY_EXTRA_CATEGORIES; i++) {
  for (let k = 0; k < QUANTITY_EXTRA_FILMS; k++) {
    const extraFilmsList = extraFilmsCategories[i].querySelector(`.films-list__container`);
    renderElements(extraFilmsList, createFilmCardTemplate(films[k]));
  }
}

const filmsCardsPosters = document.querySelectorAll(`.film-card__poster`);
const filmsCardsTitle = document.querySelectorAll(`.film-card__title`);
const filmsCardsComments = document.querySelectorAll(`.film-card__comments`);

const renderGenresFilm = (currentFilm) => {
  const termGenres = document.querySelector(`.film-details__term--genres`);
  const cellGenres = document.querySelector(`.film-details__cell--genres`);

  renderElements(cellGenres, createGenreFilmTemplate(currentFilm), `afterBegin`);

  if (document.querySelectorAll(`.film-details__genre`).length <= 1) {
    termGenres.innerHTML = `Genre`;
  }
};

const renderFilmComments = () => {
  for (let i = 0; i < comments.length; i++) {
    renderElements(document.querySelector(`.film-details__comments-list`), createFilmCommentsTemplate(comments[i]));
  }
};


const openPopupFilm = (currentFilm) => {
  if (document.querySelector(`.film-details`)) {
    document.querySelector(`.film-details`).remove();
  }

  renderElements(siteFooter, createFilmDetailsTemplate(currentFilm), `afterEnd`);
  renderGenresFilm(currentFilm);
  renderFilmComments();

  document.querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    document.querySelector(`.film-details`).remove();
  });
};

const setOpenPopupHandler = (target) => {
  target.forEach(function (elem, i) {
    elem.addEventListener(`click`, function () {
      openPopupFilm(films[i]);
    });
  });
};

setOpenPopupHandler(filmsCardsPosters);
setOpenPopupHandler(filmsCardsTitle);
setOpenPopupHandler(filmsCardsComments);

renderElements(siteFooter, createFooterStatisticsTemplate(QUANTITY_ALL_FILMS));
