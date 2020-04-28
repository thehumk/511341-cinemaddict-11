import {createProfileTemplate} from './components/profile.js';
import {createMenuTemplate} from './components/menu.js';
import {createSortingTemplate} from './components/sorting.js';
import {createFilmsTemplate} from './components/films.js';
import {createFilmCardTemplate} from './components/film-card.js';
import {createFooterStatisticsTemplate} from './components/footer-statistics.js';
import {createFilmDetailsTemplate, createGenreFilmTemplate} from './components/film-details.js';
import {randomFilms} from './mock/films.js';
import {randomComments} from './mock/comments.js';
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

setProfileRating();

renderElements(siteHeader, createProfileTemplate(profile));
renderElements(siteMain, createMenuTemplate());
renderElements(siteMain, createSortingTemplate());
renderElements(siteMain, createFilmsTemplate());

const mainFilmsList = document.querySelector(`.films-list`).querySelector(`.films-list__container`);
const extraFilmsCategories = document.querySelectorAll(`.films-list--extra`);

for (let i = 0; i < QUANTITY_RENDER_FILMS; i++) {
  renderElements(mainFilmsList, createFilmCardTemplate(randomFilms[i]));
}

const setOpenPopupHandler = (target, i) => {
  target.addEventListener(`click`, () => {
    openPopupFilm(randomFilms[i]);
  });
};

const renderFilmsList = () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount += QUANTITY_RENDER_FILMS;

  randomFilms.slice(prevTasksCount, showingTasksCount).forEach((elem) => {
    renderElements(mainFilmsList, createFilmCardTemplate(elem));
  });

  filmsCardsPosters = document.querySelectorAll(`.film-card__poster`);
  filmsCardsTitle = document.querySelectorAll(`.film-card__title`);
  filmsCardsComments = document.querySelectorAll(`.film-card__comments`);

  for (let i = prevTasksCount; i < showingTasksCount; i++) {
    setOpenPopupHandler(filmsCardsPosters[i], i);
    setOpenPopupHandler(filmsCardsTitle[i], i);
    setOpenPopupHandler(filmsCardsComments[i], i);
  }

  if (showingTasksCount >= randomFilms.length) {
    showMoreButton.remove();
  }
};

const showMoreButton = document.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, renderFilmsList);

for (let i = 0; i < QUANTITY_EXTRA_CATEGORIES; i++) {
  for (let k = 0; k < QUANTITY_EXTRA_FILMS; k++) {
    const extraFilmsList = extraFilmsCategories[i].querySelector(`.films-list__container`);
    renderElements(extraFilmsList, createFilmCardTemplate(randomFilms[k]));

    const extraFilms = extraFilmsList.querySelectorAll(`.film-card`);
    extraFilms.forEach((elem, j) => {
      setOpenPopupHandler(elem, j);
    });
  }
}

let filmCards = mainFilmsList.querySelectorAll(`.film-card`);
let filmsCardsPosters = mainFilmsList.querySelectorAll(`.film-card__poster`);
let filmsCardsTitle = mainFilmsList.querySelectorAll(`.film-card__title`);
let filmsCardsComments = mainFilmsList.querySelectorAll(`.film-card__comments`);

const renderGenresFilm = (currentFilm) => {
  const termGenres = document.querySelector(`.film-details__term--genres`);
  const cellGenres = document.querySelector(`.film-details__cell--genres`);

  renderElements(cellGenres, createGenreFilmTemplate(currentFilm), `afterBegin`);

  if (document.querySelectorAll(`.film-details__genre`).length <= 1) {
    termGenres.innerHTML = `Genre`;
  }
};

const renderFilmComments = () => {
  for (let i = 0; i < randomComments.length; i++) {
    renderElements(document.querySelector(`.film-details__comments-list`), createFilmCommentsTemplate(randomComments[i]));
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

  const closePopupKeydown = (evt) => {
    if (evt.keyCode === 27) {
      document.removeEventListener(`keydown`, closePopupKeydown);
      document.querySelector(`.film-details`).remove();
    }
  };

  document.addEventListener(`keydown`, closePopupKeydown);
};

for (let i = 0; i < filmCards.length; i++) {
  setOpenPopupHandler(filmsCardsPosters[i], i);
  setOpenPopupHandler(filmsCardsTitle[i], i);
  setOpenPopupHandler(filmsCardsComments[i], i);
}

renderElements(siteFooter, createFooterStatisticsTemplate(QUANTITY_ALL_FILMS));
