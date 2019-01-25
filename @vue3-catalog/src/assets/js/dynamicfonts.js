
var docEl = document.documentElement,
  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',

  recalc = function () {
    var clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
  };
window.addEventListener(resizeEvt, recalc, false);
document.addEventListener('DOMContentLoaded', recalc, false)

addEventListener("load", function () {
  setTimeout(hideURLbar, 0);
}, false);

function hideURLbar() {
  window.scrollTo(0, 1);
}
