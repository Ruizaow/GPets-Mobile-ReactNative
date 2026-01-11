export function handleChangePage(page, setPage, scrollRef) {
  setPage(page);

  setTimeout(() => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: false,
    });
  }, 70);
}