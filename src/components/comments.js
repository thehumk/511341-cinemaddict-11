import {createElement} from '../util.js';

export default class Comments {
  constructor(comment) {
    this._comment = comment;
    this._element = null;
  }

  getTemplate() {
    return (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="${this._comment.emoji}" width="55" height="55" alt="emoji-smile">
        </span>
        <div>
          <p class="film-details__comment-text">${this._comment.text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${this._comment.author}</span>
            <span class="film-details__comment-day">${this._comment.date}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
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
