(async () => {
  try {
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

    $(document).ready(function () {
      for (let i = 0; i < images.length; i++) {
        $(
          `<div class="carousel-item">
            <img 
              src=${images[i].link} 
              class="img-fluid" 
              alt=${images[i].title} 
            />
            <div class="carousel-caption">
              <span class="card-text">${images[i].title}</span>
            </div>
          </div>`
        ).appendTo('.carousel-inner');

        $(
          `<li data-target="#fest-carousel" data-slide-to="${i}"></li>`
        ).appendTo('.carousel-indicators');
      }
      $('.carousel-item').first().addClass('active');
      $('.carousel-indicators > li').first().addClass('active');
      $('#fest-carousel').carousel();
    });
  } catch (err) {
    console.log(err);
  }
})();
