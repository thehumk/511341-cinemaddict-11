export const profile = {
  avatar: `images/bitmap@2x.png`
};

export const QUANTITY_ALL_FILMS = 100000;

let watchedFilms = 25;

const profileRatingTable = [
  {
    quantityFilms: 0,
    rating: ``
  },
  {
    quantityFilms: 1,
    rating: `novice`
  },
  {
    quantityFilms: 11,
    rating: `fan`
  },
  {
    quantityFilms: 21,
    rating: `movie buff`
  },
  {
    quantityFilms: QUANTITY_ALL_FILMS + 1
  }
];

export const setProfileRating = () => {
  for (let i = 0; i < profileRatingTable.length; i++) {
    if (watchedFilms >= profileRatingTable[i].quantityFilms && watchedFilms < profileRatingTable[i + 1].quantityFilms) {
      profile.rating = profileRatingTable[i].rating;
      break;
    }
  }
};
