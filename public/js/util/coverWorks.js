// Getting cover photo and info for fests
const coverWorks = (fest) => {
    (async () => {
        try {
            const response = await (
                await fetch(`${url}/display/${fest}`, { method: 'GET' })
            ).json();

            if (fest === 'other') {
                specialCoverWorks(response, fest);
            } else {
                // Latest cover image
                const mainCover = `<div class="grid-item1" id="main-cover">
                <a
                href="posts.html"
                type="button"
                onclick="festByYear('${response.data[0].year}', '${fest}', '${
                    response.data[0].id
                }')"
                class="safari-issue"
              >
                <img
                  src="${response.data[0].coverImage.link}"
                  alt="${response.data[0].coverImage.title}"
                  class="img-fluid-first"
                />
                <div class="blackOverlay"></div>
                <span class="cover-text year">${response.data[0].year}</span>
                <br />
                <span class="cover-text theme">${
                    response.data[0].theme
                        ? response.data[0].theme
                        : response.data[0].name
                }</span>
                </a>
            </div>`;

                const sideCover = `<div class="side-card grid-item"> 
              <a
                href="posts.html"
                type="button"
                onclick="festByYear('${response.data[1].year}', '${fest}', '${
                    response.data[1].id
                }')"
                class="safari-issue"
              >
                <img
                  src="${response.data[1].coverImage.link}"
                  alt="${response.data[1].coverImage.title}"
                  class="img-fluid"
                />
                <div class="blackOverlay"></div>
                <span class="cover-text year">${response.data[1].year}</span>
                <br />
                <span class="cover-text theme">${
                    response.data[1].theme
                        ? response.data[1].theme
                        : response.data[1].name
                }</span>
              </a>
              </div>
              <div class="side-card grid-item">
              <a
                href="posts.html"
                type="button"
                onclick="festByYear('${response.data[2].year}', '${fest}', '${
                    response.data[2].id
                }')"
                class="safari-issue"
              >
                <img
                  src="${response.data[2].coverImage.link}"
                  alt="${response.data[2].coverImage.title}"
                  class="img-fluid"
                />
                <div class="blackOverlay"></div>
                <span class="cover-text year">${response.data[2].year}</span>
                <br />
                <span class="cover-text theme">${
                    response.data[2].theme
                        ? response.data[2].theme
                        : response.data[2].name
                }</span>
              </a>  
            </div>`;

                $(`.${fest}-gallery`).append(mainCover);
                $(`.${fest}-gallery`).append(sideCover);

                for (let i = 3; i < response.data.length; i++) {
                    const cover = `<div class="bottom-card grid-item">
              <a
                href="posts.html"
                type="button"
                onclick="festByYear('${response.data[i].year}', '${fest}', '${
                        response.data[i].id
                    }')"
                class="safari-issue"
              >
                <img
                  src="${response.data[i].coverImage.link}"
                  alt="${response.data[i].coverImage.title}"
                  class="img-fluid"
                />
                <div class="blackOverlay"></div>
                <span class="cover-text year">${response.data[i].year}</span>
                <br />
                <span class="cover-text theme">${
                    response.data[i].theme
                        ? response.data[i].theme
                        : response.data[i].name
                }</span>
              </a>
            </div>`;

                    $(`.${fest}-gallery`).append(cover);
                }
            }
        } catch (err) {
            console.log(err);
        }
    })();
};

const specialCoverWorks = (response, fest) => {
    for (let i = 0; i < response.data.length; i++) {
        const cover = `<div class="bottom-card other-cards">
        <a
    href="posts.html"
    type="button"
    onclick="festByYear('${response.data[i].year}', '${fest}', '${
            response.data[i].id
        }')"
    class="safari-issue"
  >
    <img
      src="${response.data[i].coverImage.link}"
      alt="${response.data[i].coverImage.title}"
      class="img-fluid"
    />
    <div class="other-blackOverlay"></div>
    <span class="cover-text year">${response.data[i].year}</span>
    <br />
    <span class="cover-text theme">${
        response.data[i].theme ? response.data[i].theme : response.data[i].name
    }</span>
  </a>
</div>`;
        $(`.${fest}-gallery`).append(cover);
    }
};

const festByYear = (year, fest, id) => {
    localStorage.setItem('year', year);
    localStorage.setItem('fest', fest);
    localStorage.setItem('_id', id);
};

function eventFire(el, etype) {
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

function activeTab() {
    const fest = localStorage.getItem('fest');

    if (fest) {
        eventFire(document.getElementById(`${fest}-tab`), 'click');
        coverWorks(fest);
    } else {
        eventFire(document.getElementById('waves-tab'), 'click');
        coverWorks('waves');
    }
}

activeTab();
