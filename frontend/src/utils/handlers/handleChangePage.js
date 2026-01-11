export function handleChangePage(page, setPage, scrollRef) {
  setPage(page);

  requestAnimationFrame(() => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: false,
    });
  });
}