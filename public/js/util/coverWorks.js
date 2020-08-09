// Getting cover photo and info for fests
const coverWorks = (fest) => {
  (async () => {
    try {
      const response = await (
        await fetch(`${url}/display/${fest}`, { method: 'GET' })
      ).json();

      for (let i = 0; i < response.data.length; i++) {
        const cover = `<div class="col-12 col-md-4 mb-4">
            <a 
              href="posts.html"
              type="button" 
              onclick="festByYear('${response.data[i].year}', '${fest}')"
              class="safari-issue"
            >
              <img
                class="card-img-top"
                src=${response.data[i].coverImage.link}
                alt=${response.data[i].coverImage.title}
              />
              <div class="card-text year">${response.data[i].year}</div>
              <div class="card-text theme text-uppercase">${response.data[i].theme}</div>
            </a>
          </div>`;
        $(`.${fest}-carousel`).append(cover);
      }
      
      // new Glider(document.querySelector(`.${fest}-carousel`), {
      //   slidesToShow: 4,
      //   slidesToScroll: 1,
      //   arrows: {
      //     prev: document.querySelector(`.${fest}-prev`),
      //     next: document.querySelector(`.${fest}-next`),
      //   },
      // });

      // $(`.${fest}-slider`).slick({
      //   infinite: true,
      //   speed: 300,
      //   slidesToShow: 3,
      //   slidesToScroll: 3,
      //   prevArrow: $('.prev'),
      //   nextArrow: $('.next'),
      // });
    } catch (err) {
      console.log(err);
    }
  })();
};

const festByYear = (year, fest) => {
  localStorage.setItem('year', year);
  localStorage.setItem('fest', fest);
};
