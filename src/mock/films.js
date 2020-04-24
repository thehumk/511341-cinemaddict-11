import {getRandomNumber} from './../util.js';
import {comments} from './comments.js';

export const films = [];

const QUANTITY_FILMS = 15;

const FILMS_TITLE = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
  `The Great Flamarion`,
  `Made for Each Other`
];

const FILMS_POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const DESCRIPTION = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const MIN_LENGTH_DESCRIPTION = 1;
const MAX_LENGTH_DESCRIPTION = 5;

const getRandomDescription = () => {
  let randomDescription = ``;
  const lengthDescription = getRandomNumber(MIN_LENGTH_DESCRIPTION, MAX_LENGTH_DESCRIPTION);

  for (let i = 0; i < lengthDescription; i++) {
    randomDescription += DESCRIPTION[getRandomNumber(0, DESCRIPTION.length - 1)] + ` `;
  }

  return randomDescription;
};

export const createRandomFilms = () => {
  for (let i = 0; i < QUANTITY_FILMS; i++) {
    films[i] = {};
    films[i].title = FILMS_TITLE[getRandomNumber(0, FILMS_TITLE.length - 1)];
    films[i].titleOriginal = films[i].title;
    films[i].poster = `images/posters/` + FILMS_POSTERS[getRandomNumber(0, FILMS_POSTERS.length - 1)];
    films[i].age = `16+`;
    films[i].rating = getRandomNumber(0, 10, 1);
    films[i].director = `Anthony Mann`;
    films[i].writers = `Anne Wigton, Heinz Herald, Richard Weil`;
    films[i].actors = `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`;
    films[i].year = getRandomNumber(1900, 2020);
    films[i].releaseDate = `30 March ` + films[i].year;
    films[i].country = `USA`;
    films[i].description = getRandomDescription();
    films[i].duration = getRandomNumber(0, 3) + `h ` + getRandomNumber(0, 59) + `m`;
    films[i].genre = [`Musical`, `Western`];
    films[i].comments = comments;
  }
};
