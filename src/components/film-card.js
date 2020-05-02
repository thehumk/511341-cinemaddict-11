import {createElement} from '../util.js';

export default class FilmCard {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    const shortDescription = this._film.description.length > 140 ? this._film.description.slice(0, 140) + `...` : this._film.description;
    return (
      `<article class="film-card">
        <h3 class="film-card__title">${this._film.title}</h3>
        <p class="film-card__rating">${this._film.rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${this._film.year}</span>
          <span class="film-card__duration">${this._film.duration}</span>
          <span class="film-card__genre">${this._film.genre[0]}</span>
        </p>
        <img src="${this._film.poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${shortDescription}</p>
        <a class="film-card__comments">${this._film.comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
        </form>
      </article>`
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
