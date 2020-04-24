export const createFooterStatisticsTemplate = (quantityFilms) => {
  return (
    `<section class="footer__statistics">
      <p>${quantityFilms} movies inside</p>
    </section>`
  );
};
