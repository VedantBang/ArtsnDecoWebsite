// Getting cover photo and info for fests
const coverWorks = (fest) => {
  (async () => {
    try {
      const response = await (
        await fetch(`${url}/display/${fest}`, { method: "GET" })
      ).json();

      console.log(response);

      for (let i = 0; i < response.data.length; i++) {
        const cover = `<div class="col-md-4 card w-40 mb-4">
            <a 
              href="posts.html"
              type="button" 
              onclick="festByYear('${response.data[i].year}')"
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
        $(`#${fest}`).append(cover);
      }
    } catch (err) {
      console.log(err);
    }
  })();
};

const festByYear = (year) => {
  localStorage.setItem("year", year);
};
