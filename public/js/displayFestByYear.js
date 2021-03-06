(async () => {
  let swiper = new Swiper('.swiper-container', {
    slidesPerView: 2,
    centeredSlides: true,
    loop: true,
    spaceBetween: 0,
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

  if (localStorage.getItem('fest') === 'other') {
    const response = await (
      await fetch(`${url}/display/id/${localStorage.getItem('_id')}`, {
        method: 'GET',
      })
    ).json();

    const images = response.data.images;

    for (let i = 0; i < images.length; i++) {
      swiper.appendSlide(`
<div class="swiper-slide" id="${i}">
  <img
    src="${images[i].link}"
    alt="${images[i].title}"
    class="img-fluid"
  />
  <div class="text-white number">${i < 10 ? `0${i + 1}` : `${i + 1}`}</div>
  <div class="text-white fest-year">
    ${response.data.name}
  </div>
  <div class="text-white post">${images[i].title}</div>
</div>`);
    }
  } else {
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
      swiper.appendSlide(`
<div class="swiper-slide" id="${i}">
  <img
    src="${images[i].link}"
    alt="${images[i].title}"
    class="img-fluid"
  />
  <div class="text-white number">${i < 10 ? `0${i + 1}` : `${i + 1}`}</div>
  <div class="text-white fest-year">
    ${response.data[0].fest} ${response.data[0].year}
  </div>
  <div class="text-white post">${images[i].title}</div>
</div>`);
    }
  }
})();
