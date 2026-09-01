const scrollToTop = () => {
  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  html.style.scrollBehavior = previous;
};

export default scrollToTop;