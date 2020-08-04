coverWorks('waves')
coverWorks('quark');
coverWorks('spree');
coverWorks('other');

// $('#fest-carousel').on('slide.bs.carousel', function (e) {
//   coverWorks('waves');
//   let $e = $(e.relatedTarget);
//   let idx = $e.index();
//   let itemsPerSlide = 4;
//   let totalItems = $('.carousel-item').length;

//   if (idx >= totalItems - (itemsPerSlide - 1)) {
//     let it = itemsPerSlide - (totalItems - idx);
//     for (let i = 0; i < it; i++) {
//       if (e.direction === 'left') {
//         $('.carousel-item').eq(i).appendTo('.carousel-inner');
//       } else {
//         $('.carousel-item').eq(0).appendTo('.carousel-inner');
//       }
//     }
//   }
// });
