$(document).ready(function() {
  $(document).foundation();
  $('#offCanvasLeft').on('opened.zf.offcanvas', function() {
    console.log('we opened');
  });
});
