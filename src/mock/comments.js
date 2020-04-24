import {getRandomNumber} from './../util.js';

export const comments = [];

let quantityComments = getRandomNumber(0, 5);

const EMOJI = [
  `images/emoji/smile.png`,
  `images/emoji/sleeping.png`,
  `images/emoji/puke.png`,
  `images/emoji/angry.png`
];

export const createRandomComments = () => {
  for (let i = 0; i < quantityComments; i++) {
    comments[i] = {};
    comments[i].emoji = EMOJI[getRandomNumber(0, EMOJI.length - 1)];
    comments[i].text = `text...`;
    comments[i].author = `Author`;
    comments[i].date = `2019/12/31 23:59`;
  }
};
