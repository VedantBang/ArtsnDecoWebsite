const displayCreativeWorks = async () => {
  try {
    const response = await (
      await fetch(`${url}/creative/all`, { method: 'GET' })
    ).json();

    for (let i = 0; i < response.data.length; i++) {
      const creativePost = `<div class="col-12 col-sm-6 col-md-4">
            <img src="${response.data[i].link}" alt="${response.data[i].title}" class="card-img-top" />
        </div>`;
      $('.carousel').append(creativePost);
    }
  } catch (err) {
    console.log(err);
  }
};
