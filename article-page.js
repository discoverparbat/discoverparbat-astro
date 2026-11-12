// Article pages: reading-progress bar and "On this page" highlighting.
// Used by articles made from src/pages/article/_template.astro
(function () {
  var bar = document.getElementById('artBar');
  function onScroll() {
    var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    if (bar) bar.style.width = (max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  var links = Array.prototype.slice.call(document.querySelectorAll('#artToc a'));
  var rail = document.querySelector('.art-rail');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + e.target.id;
          a.classList.toggle('on', on);
          if (on && rail && window.innerWidth <= 980) {
            var left = a.getBoundingClientRect().left - rail.getBoundingClientRect().left + rail.scrollLeft - 24;
            rail.scrollTo({ left: left, behavior: 'smooth' });
          }
        });
      });
    }, { rootMargin: '-15% 0px -70% 0px' });
    links.forEach(function (a) { var t = document.getElementById(a.getAttribute('href').slice(1)); if (t) io.observe(t); });
  }
})();
