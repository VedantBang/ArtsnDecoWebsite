// Get Current data for selected fest
(async () => {
  try {
    spinner('.loading');

    const response = await (
      await fetch(`${url}/display/id/${localStorage.getItem('festId')}`, {
        method: 'GET',
      })
    ).json();

    $('.loading').empty();

    // Displaying fest type
    const fest = document.querySelector('#fest');
    fest.innerHTML = `Fest: ${
      response.data.fest[0].toUpperCase() + response.data.fest.slice(1)
    }`;

    // Displaying Name in case of "other" fest type
    if (response.data.name) {
      const name = document.querySelector('#name');
      name.innerHTML = `Name: ${response.data.name}`;
    }

    // Displaying year
    const year = document.querySelector('#year');
    year.innerHTML = `Year: ${response.data.year}`;

    // Displaying theme if present
    if (response.data.theme) {
      const theme = document.querySelector('#theme');
      theme.innerHTML = `Theme: ${response.data.theme}`;
    }

    // Displaying fest images
    for (let i = 0; i < response.data.images.length; i++) {
      console.log(response.data.images[i].title);
      const image = `<div class="col-12 col-md-6 col-lg-4 mb-4">
      <div class="card card-common">
        <img
          src="${response.data.images[i].link}"
          alt="${response.data.images[i].title}"
          class="card-img-top img-fluid"
        />
        <div class="card-body text-muted">
          <p>${response.data.images[i].title}</p>
        </div>
      </div>
    </div>`;
      $('#fest-images').append(image);
    }
  } catch (err) {
    console.log(err);
  }
})();

// Deleting fest request
document.getElementById('delete-fest').addEventListener('click', async () => {
  try {
    const formData = new FormData();

    formData.append('list', localStorage.getItem('festId'));

    const response = await (
      await fetch(`${url}/change/deletefest`, {
        method: 'DELETE',
        headers: { token: `${localStorage.getItem('token')}` },
        body: formData,
      })
    ).json();

    if (response.ok) {
      localStorage.removeItem('festId');
      window.location.href = 'fests.html';
    } else {
      document.querySelector('.fest-delete-error-alert').style.display =
        'block';
    }
  } catch (err) {
    console.log(err);
  }
});

// Deleting data from localstorage on clicking go-back
const deleteFestId = () => {
  localStorage.removeItem('festId');
};
