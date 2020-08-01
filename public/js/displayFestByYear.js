(async () => {
  try {
    const response = await (
      await fetch(`${url}/display/${localStorage.getItem("year")}`, {
        method: "GET",
      })
    ).json();

    console.log(response);
    for (let i = 0; i < response.data[0].images.length; i++) {
      const carouselItem = `<div class="carousel-item active">
  <div class="view">
    <img
      class="w-100 carousel-image"
      src="${response.data[0].images[i].link}"
      alt="${response.data[0].images[i].title}"
    />
    <div class="mask rgba-black-light"></div>
  </div>
  <div class="carousel-caption d-flex justify-content-end justify-content-center">
    <h3 class="h3-responsive text-uppercase pr-5 mr-5">
      <span class="text-uppercase">${response.data[0].fest}</span>
      ${response.data[0].year}
    </h3>
    <h3 class="h3-responsive text-uppercase pl-5 ml-5">
      ${response.data[0].images[i].title}
    </h3>
  </div>
</div>`;
      $(".fest-images").html(carouselItem);
    }
  } catch (err) {
    console.log(err);
  }
})();
