import {render, remove} from '../utils/render.js';
import FilmsComponent from '../components/films.js';
import ShowMoreComponent from '../components/show-more.js';
import FilmCardComponent from '../components/film-card.js';
import FilmDetailsComponent from '../components/film-details.js';
import CommentsComponent from '../components/comments.js';
import {randomFilms} from '../mock/films.js';
import {randomComments} from '../mock/comments.js';

export default class PageController {
  constructor(container) {
    this._container = container;
    this._films = new FilmsComponent();
    this._showMoreButton = new ShowMoreComponent();
  }

  render() {
    const siteMain = document.querySelector(`.main`);
    const siteFooter = document.querySelector(`.footer`);

    const QUANTITY_RENDER_FILMS = 5;
    const QUANTITY_EXTRA_FILMS = 2;
    const QUANTITY_EXTRA_CATEGORIES = 2;
    let showingTasksCount = QUANTITY_RENDER_FILMS;

    render(siteMain, this._films);

    const mainFilmsList = this._films._element.querySelector(`.films-list`);
    const mainFilmsListContainer = mainFilmsList.querySelector(`.films-list__container`);
    const extraFilmsCategories = this._films._element.querySelectorAll(`.films-list--extra`);

    for (let i = 0; i < QUANTITY_RENDER_FILMS; i++) {
      const filmCards = new FilmCardComponent(randomFilms[i]);
      render(mainFilmsListContainer, filmCards);
      filmCards.setClickHandler(() => {
        openPopupFilm(randomFilms[i]);
      });
    }

    const renderFilmsList = () => {
      const prevTasksCount = showingTasksCount;
      showingTasksCount += QUANTITY_RENDER_FILMS;

      randomFilms.slice(prevTasksCount, showingTasksCount).forEach((elem) => {
        const filmCards = new FilmCardComponent(elem);
        render(mainFilmsListContainer, filmCards);
        filmCards.setClickHandler(() => {
          openPopupFilm(elem);
        });
      });

      if (showingTasksCount >= randomFilms.length) {
        remove(this._showMoreButton);
      }
    };

    for (let i = 0; i < QUANTITY_EXTRA_CATEGORIES; i++) {
      for (let k = 0; k < QUANTITY_EXTRA_FILMS; k++) {
        const extraFilmsList = extraFilmsCategories[i].querySelector(`.films-list__container`);
        const extraFilmCard = new FilmCardComponent(randomFilms[k]);
        render(extraFilmsList, extraFilmCard);
        extraFilmCard.setClickHandler(() => {
          openPopupFilm(randomFilms[k]);
        });
      }
    }

    const renderFilmComments = () => {
      for (let i = 0; i < randomComments.length; i++) {
        render(document.querySelector(`.film-details__comments-list`), new CommentsComponent(randomComments[i]));
      }
    };

    const openPopupFilm = (currentFilm) => {
      const closePopup = () => {
        document.removeEventListener(`keydown`, closePopupKeydown);
        remove(filmDetails);
      };

      const closePopupKeydown = (evt) => {
        if (evt.keyCode === 27) {
          document.removeEventListener(`keydown`, closePopupKeydown);
          remove(filmDetails);
        }
      };

      if (document.querySelector(`.film-details`)) {
        document.querySelector(`.film-details`).remove();
      }

      const filmDetails = new FilmDetailsComponent(currentFilm);
      render(siteFooter, filmDetails);
      renderFilmComments();

      filmDetails.setClickHandler(closePopup, closePopupKeydown);
    };

    render(mainFilmsList, this._showMoreButton);
    this._showMoreButton.setClickHandler(renderFilmsList);
  }
}
