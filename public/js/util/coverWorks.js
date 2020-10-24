// Getting cover photo and info for fests
const coverWorks = (fest) => {
  (async () => {
    try {
      const response = await (
        await fetch(`${url}/display/${fest}`, { method: 'GET' })
      ).json();

      for (let i = 0; i < response.data.length; i++) {
        const cover = `<div class="${
          i === 0 ? 'col-12 col-md-8' : 'col-12 col-md-4'
        }">
  <a
    href="posts.html"
    type="button"
    onclick="festByYear('${response.data[i].year}', '${fest}')"
    class="safari-issue"
  >
    <img
      src="${response.data[i].coverImage.link}"
      alt="${response.data[i].coverImage.title}"
      class="${i === 0 ? 'img-fluid-first' : 'img-fluid'}"
    />
    <span class="cover-text year">${response.data[i].year}</span>
    <br />
    <span class="cover-text theme">${response.data[i].theme}</span>
  </a>
</div>`;
        $(`.${fest}-gallery`).append(cover);
      }

      // for (let i = 0; i < response.data.length; i++) {
      //   const cover = `<div class="${
      //     i === 0 ? 'col-12 col-md-8 m-4' : 'col-12 col-md-4 m-4'
      //   }>
      //       <a
      //         href="posts.html"
      //         type="button"
      //         onclick="festByYear('${response.data[i].year}', '${fest}')"
      //         class="safari-issue"
      //       >
      //         <img
      //           class=""
      //           src=${response.data[i].coverImage.link}
      //           alt=${response.data[i].coverImage.title}
      //         />
      //         <div class="card-text year">${response.data[i].year}</div>
      //         <div class="card-text theme text-uppercase">${
      //           response.data[i].theme
      //         }</div>
      //       </a>
      //     </div>`;
      //   $(`.${fest}-carousel`).append(cover);
    } catch (err) {
      console.log(err);
    }
  })();
};

const festByYear = (year, fest) => {
  localStorage.setItem('year', year);
  localStorage.setItem('fest', fest);
};
