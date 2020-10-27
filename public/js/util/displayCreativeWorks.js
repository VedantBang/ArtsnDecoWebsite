const displayCreativeWorks = async () => {
  try {
    let swiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerGroup: 3,
      loop: true,
      loopFillGroupWithBlank: true,
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
      await fetch(`${url}/creative/all`, { method: 'GET' })
    ).json();

    console.log(response);

    for (let i = 0; i < response.data.length; i++) {
      swiper.appendSlide(`<div class="swiper-slide">
            <img src="${response.data[i].link}" alt="${response.data[i].title}" class="card-img-top" />
        </div>`);
    }
  } catch (err) {
    console.log(err);
  }
};
