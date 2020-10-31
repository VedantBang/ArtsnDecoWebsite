// Getting cover photo and info for fests
const coverWorks = (fest) => {
  (async () => {
    try {
      const response = await (
        await fetch(`${url}/display/${fest}`, { method: 'GET' })
      ).json();

      // Latest cover image
      const mainCover = `<div class="grid-item1" id="main-cover">
  <a
    href="posts.html"
    type="button"
    onclick="festByYear('${response.data[0].year}', '${fest}')"
    class="safari-issue"
  >
    <img
      src="${response.data[0].coverImage.link}"
      alt="${response.data[0].coverImage.title}"
      class="img-fluid-first"
    />
    <span class="cover-text year">${response.data[0].year}</span>
    <br />
    <span class="cover-text theme">${response.data[0].theme}</span>
  </a>
</div>`;

      const sideCover = `<div class="side-card grid-item""> 
  <a
    href="posts.html"
    type="button"
    onclick="festByYear('${response.data[1].year}', '${fest}')"
    class="safari-issue"
  >
    <img
      src="${response.data[1].coverImage.link}"
      alt="${response.data[1].coverImage.title}"
      class="img-fluid"
    />
    <span class="cover-text year">${response.data[1].year}</span>
    <br />
    <span class="cover-text theme">${response.data[1].theme}</span>
  </a>
  </div>
  <div class="side-card grid-item"">
  <a
    href="posts.html"
    type="button"
    onclick="festByYear('${response.data[2].year}', '${fest}')"
    class="safari-issue"
  >
    <img
      src="${response.data[2].coverImage.link}"
      alt="${response.data[2].coverImage.title}"
      class="img-fluid"
    />
    <span class="cover-text year">${response.data[2].year}</span>
    <br />
    <span class="cover-text theme">${response.data[2].theme}</span>
  </a>  
</div>`;

      $(`.${fest}-gallery`).append(mainCover);
      $(`.${fest}-gallery`).append(sideCover);

      for (let i = 3; i < response.data.length; i++) {
        const cover = `<div class="bottom-card grid-item"">
  <a
    href="posts.html"
    type="button"
    onclick="festByYear('${response.data[i].year}', '${fest}')"
    class="safari-issue"
  >
    <img
      src="${response.data[i].coverImage.link}"
      alt="${response.data[i].coverImage.title}"
      class="img-fluid"
    />
    <span class="cover-text year">${response.data[i].year}</span>
    <br />
    <span class="cover-text theme">${response.data[i].theme}</span>
  </a>
</div>`;

        $(`.${fest}-gallery`).append(cover);
      }
    } catch (err) {
      console.log(err);
    }
  })();
};

const festByYear = (year, fest) => {
  localStorage.setItem('year', year);
  localStorage.setItem('fest', fest);
};
