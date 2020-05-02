import {createElement} from '../util.js';

export default class Profile {
  constructor(profile) {
    this._profile = profile;
    this._element = null;
  }

  getTemplate() {
    return (
      `<section class="header__profile profile">
        <p class="profile__rating">${this._profile.rating}</p>
        <img class="profile__avatar" src="${this._profile.avatar}" alt="Avatar" width="35" height="35">
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
