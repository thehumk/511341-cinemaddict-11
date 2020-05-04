import ProfileComponent from './components/profile.js';
import MenuComponent from './components/menu.js';
import SortingComponent from './components/sorting.js';
import FilmsComponent from './components/films.js';
import FilmCardComponent from './components/film-card.js';
import FooterStatisticsComponent from './components/footer-statistics.js';
import FilmDetailsComponent from './components/film-details.js';
import CommentsComponent from './components/comments.js';
import {randomFilms} from './mock/films.js';
import {randomComments} from './mock/comments.js';
import {profile, setProfileRating, QUANTITY_ALL_FILMS} from './mock/profile.js';
import {render} from './util.js';

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);

const QUANTITY_RENDER_FILMS = 5;
const QUANTITY_EXTRA_FILMS = 2;
const QUANTITY_EXTRA_CATEGORIES = 2;
let showingTasksCount = QUANTITY_RENDER_FILMS;

setProfileRating();

render(siteHeader, new ProfileComponent(profile).getElement());
render(siteMain, new MenuComponent().getElement());
render(siteMain, new SortingComponent().getElement());
render(siteMain, new FilmsComponent().getElement());

const mainFilmsList = document.querySelector(`.films-list`).querySelector(`.films-list__container`);
const extraFilmsCategories = document.querySelectorAll(`.films-list--extra`);

for (let i = 0; i < QUANTITY_RENDER_FILMS; i++) {
  render(mainFilmsList, new FilmCardComponent(randomFilms[i]).getElement());
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
    render(mainFilmsList, new FilmCardComponent(elem).getElement());
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
    render(extraFilmsList, new FilmCardComponent(randomFilms[k]).getElement());

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

const renderFilmComments = () => {
  for (let i = 0; i < randomComments.length; i++) {
    render(document.querySelector(`.film-details__comments-list`), new CommentsComponent(randomComments[i]).getElement());
  }
};


const openPopupFilm = (currentFilm) => {
  if (document.querySelector(`.film-details`)) {
    document.querySelector(`.film-details`).remove();
  }

  render(siteFooter, new FilmDetailsComponent(currentFilm).getElement());
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

render(siteFooter, new FooterStatisticsComponent(QUANTITY_ALL_FILMS).getElement());
