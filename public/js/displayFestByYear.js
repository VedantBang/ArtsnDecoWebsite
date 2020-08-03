(async () => {
  try {
    const response = await (
      await fetch(`${url}/display/${localStorage.getItem('year')}`, {
        method: 'GET',
      })
    ).json();

    console.log(response);
    for (let i = 0; i < response.data[0].images.length; i++) {
      document.querySelector(
        '.bg-image'
      ).src = `${response.data[0].images[0].link}`;
      const carouselItem = `<div class="carousel-item active">
  <div class="view">
    <img
      class="img-fluid"
      src="${response.data[0].images[0].link}"
      alt="${response.data[0].images[i].title}"
    />
    <div class="mask rgba-black-light"></div>
  </div>
</div>`;
      $('.fest-images').html(carouselItem);
    }
  } catch (err) {
    console.log(err);
  }
})();
