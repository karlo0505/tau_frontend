export const onChangeLeft = (
  pageVisited,
  pageNumber,
  setActiveRight,
  setActiveLeft,
  setPageNumber
) => {
  if (pageVisited > 0) {
    setPageNumber(pageNumber - 1);
    if (pageNumber > 1) {
      setActiveRight(true);
    } else {
      setActiveLeft(false);
    }
  }
};

export const onChangeRight = (
  pageVisited,
  pageNumber,
  setActiveRight,
  setActiveLeft,
  setPageNumber,
  totalPages,
  perPage
) => {
  if (totalPages > pageVisited + perPage) {
    setPageNumber(pageNumber + 1);
    setActiveLeft(true);
    if (pageNumber + 3 > totalPages / 10) {
      setActiveRight(false);
    }
  }
};
