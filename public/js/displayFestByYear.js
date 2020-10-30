(async () => {
  try {
    let swiper = new Swiper('.swiper-container', {
      slidesPerView: 1.5,
      centeredSlides: true,
      loop: true,
      lazy: true,
      spaceBetween: 0,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    const response = await (
      await fetch(
        `${url}/display/${localStorage.getItem(
          'fest'
        )}?year=${localStorage.getItem('year')}`,
        {
          method: 'GET',
        }
      )
    ).json();

    const images = response.data[0].images;

    for (let i = 0; i < images.length; i++) {
      swiper.appendSlide(`<div class="swiper-slide" id="${i}">
          <img src="${images[i].link}" alt="${images[i].title}" class="img-fluid swiper-lazy" />
          <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
      </div>`);
    }
    let item = 0;
    document.querySelector('.title').innerHTML = `${images[item].title}`;
    document.querySelector(
      '.bg-image'
    ).style.backgroundImage = `url(${images[item].link})`;
    document.querySelector(
      '.fest'
    ).innerHTML = `${response.data[0].fest} ${response.data[0].year}`;

    document
      .querySelector('.swiper-button-next')
      .addEventListener('click', () => {
        item++;
        if (item < images.length) {
          document.querySelector('.title').innerHTML = `${images[item].title}`;
          document.querySelector(
            '.bg-image'
          ).style.backgroundImage = `url(${images[item].link})`;
        } else {
          item = 0;
          document.querySelector('.title').innerHTML = `${images[item].title}`;
          document.querySelector(
            '.bg-image'
          ).style.backgroundImage = `url(${images[item].link})`;
        }
      });

    document
      .querySelector('.swiper-button-prev')
      .addEventListener('click', () => {
        item--;
        if (item >= 0) {
          document.querySelector('.title').innerHTML = `${images[item].title}`;
          document.querySelector(
            '.bg-image'
          ).style.backgroundImage = `url(${images[item].link})`;
        } else {
          item = images.length - 1;
          document.querySelector('.title').innerHTML = `${images[item].title}`;
          document.querySelector(
            '.bg-image'
          ).style.backgroundImage = `url(${images[item].link})`;
        }
      });

    // $(document).ready(function () {
    //   for (let i = 0; i < images.length; i++) {
    //     $(
    //       `<div class="carousel-item">
    //                     <div class="item__third">
    //                         <img
    //                             src=${images[i].link}
    //                             class="img-fluid d-block w-100"
    //                             alt=${images[i].title}
    //                         />
    //                         <div class="carousel-caption">
    //                             <span class="card-text">${images[i].title}</span>
    //                         </div>
    //                     </div>
    //                 </div>`
    //     ).appendTo('.carousel-inner');

    //     $(
    //       `<li data-target="#fest-carousel" data-slide-to="${i}"></li>`
    //     ).appendTo('.carousel-indicators');
    //   }
    //   $('.carousel-item').first().addClass('active');
    //   $('.carousel-indicators > li').first().addClass('active');
    //   $('#fest-carousel').carousel();

    //   // Implementing https://codepen.io/MhSami/pen/zNBMbj code
    //   $('.carousel-item', '.show-neighbors')
    //     .each(function () {
    //       var next = $(this).next();
    //       if (!next.length) {
    //         next = $(this).siblings(':first');
    //       }
    //       next.children(':first-child').clone().appendTo($(this));
    //     })
    //     .each(function () {
    //       var prev = $(this).prev();
    //       if (!prev.length) {
    //         prev = $(this).siblings(':last');
    //       }
    //       prev.children(':nth-last-child(2)').clone().prependTo($(this));
    //     });
    // });

    // let item = 0;
    // document.querySelector('.bg-image').src = images[item].link;

    // $('#fest-carousel').on('slide.bs.carousel', function (e) {
    //   if (item < images.length) {
    //     document.querySelector('.bg-image').src = images[item++].link;
    //   } else {
    //     item = 0;
    //     document.querySelector('.bg-image').src = images[item].link;
    //   }
    // });
  } catch (err) {
    console.log(err);
  }
})();
