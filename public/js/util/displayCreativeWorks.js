const displayCreativeWorks = async () => {
  try {
    let swiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      loopFillGroupWithBlank: true,
      lazy: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        40: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      },
    });

    const response = await (
      await fetch(`${url}/creative/all`, { method: 'GET' })
    ).json();

    for (let i = 0; i < response.data.length; i++) {
      swiper.appendSlide(`<div class="swiper-slide" data-hash="${response.data[i].title}">
          <div class="card">
            <img src="${response.data[i].link}" alt="${response.data[i].title}" class="img-fluid swiper-lazy" />
            <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
          </div>
        </div>`);
    }
  } catch (err) {
    console.log(err);
  }
};
