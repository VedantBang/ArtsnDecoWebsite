const displayProfiles = async () => {
  try {
    const response = await (
      await fetch(`${url}/profile/all`, {
        method: 'GET',
      })
    ).json();

    for (let i = 0; i < response.data.length; i++) {
      const post = `<div class="col-12 col-sm-6 col-lg-4 d-flex align-items-stretch">
              <div class="card team px-5 mt-5">
                <div class="card-body">
                  <img
                    src="${response.data[i].image}"
                    alt="${response.data[i].name}"
                    class="avatar-img mx-auto d-block"
                  />
                  <div class="card-text">
                    <p class="name text-center">${response.data[i].name}</p>
                    <p class="post text-center text-uppercase">
                      ${response.data[i].post}
                    </p>
                    <div class="social-media-links text-center">
                      <a href="${response.data[i].insta}" class="no-deco" target="_blank"
                        ><i class="fab fa-instagram socials-i"></i
                      ></a>
                      <a href="${response.data[i].facebook}" class="no-deco" target="_blank"
                        ><i class="fab fa-facebook socials-i"></i
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
      $('#profiles').append(post);
    }
  } catch (err) {
    console.log(err);
  }
};
