$(document).ready(function() {
  $(document).foundation();
  $('#offCanvasLeft').on('opened.zf.offcanvas', function() {
    console.log('we opened');
  });
  $('.weathers').slick({
    dots: false,
    infinite: true,
    slidesToShow: 1,
    arrows: true,
    prevArrow: '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
    nextArrow: '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
  });
});
