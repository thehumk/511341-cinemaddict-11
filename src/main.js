import ProfileComponent from './components/profile.js';
import MenuComponent from './components/menu.js';
import SortingComponent from './components/sorting.js';
import FooterStatisticsComponent from './components/footer-statistics.js';
import {profileMock, QUANTITY_ALL_FILMS} from './mock/profile.js';
import {render} from './utils/render.js';
import PageControllerRender from './controllers/page.js';

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);

render(siteHeader, new ProfileComponent(profileMock));
render(siteMain, new MenuComponent());
render(siteMain, new SortingComponent());
render(siteFooter, new FooterStatisticsComponent(QUANTITY_ALL_FILMS));

const pageController = new PageControllerRender();
pageController.render();
