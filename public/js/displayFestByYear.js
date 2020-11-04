(async () => {
  try {
    let swiper = new Swiper('.swiper-container', {
      slidesPerView: 2,
      centeredSlides: true,
      loop: true,
      spaceBetween: 10,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        40: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
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

    console.log(response);

    const images = response.data[0].images;

    for (let i = 0; i < images.length; i++) {
      swiper.appendSlide(`<div class="swiper-slide" id="${i}">
          <img src="${images[i].link}" alt="${images[i].title}" class="img-fluid" />
          <div class="text-white fest-year">${response.data[0].fest} ${response.data[0].year}</div>
          <div class="text-white post">${images[i].title}</div>
      </div>`);
    }
  } catch (err) {
    console.log(err);
  }
})();
