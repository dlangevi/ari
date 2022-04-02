(function() {
  setTimeout(function() {
    window.scrollTo(0, y);
    document.children[0].animate({scrollTop: 0}, 1);
    document.body.animate({scrollTop: 0}, 1);
    const writings = document.querySelector('#writings');
    writings.classList.add('show');
    window.scroll(0, 0);
    writings.classList.add('slideIn');
  }, 1);
})();
