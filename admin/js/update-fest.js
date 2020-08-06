// Get Current data for selected fest
(async () => {
  try {
    const response = await (
      await fetch(`${url}/display/id/${localStorage.getItem('festId')}`, {
        method: 'GET',
      })
    ).json();

    // Displaying current data in form
    // Select option for fest
    const fests = document.querySelector('#fest');
    [...fests.options].map((fest) => {
      if (fest.value === response.data.fest) {
        fest.selected = true;
      }
    });

    // Setting name field
    document.querySelector('#name').value = response.data.name;

    // Setting Year
    document.querySelector('#year').value = response.data.year;

    // Setting Theme
    document.querySelector('#theme').value = response.data.theme;

    // setting images added table
    for (let i = 0; i < response.data.images.length; i++) {
      const row = `<tr>
                  <td>
                    <input type="checkbox" id="delete" value=${response.data.images[i]._id}/>
                  </td>
                  <td>
                    <input
                      type="text"
                      value=${response.data.images[i].title}
                      class="form-control form-control-sm title"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value=${response.data.images[i].link}
                      class="form-control form-control-sm link"
                    />
                  </td>
                </tr>`;
      $('.images').append(row);
    }
  } catch (err) {
    console.log(err);
  }
})();

// Adding new image to table
document.getElementById('add-image').addEventListener('click', () => {
  const title = document.querySelector('#image-title').value;
  const link = document.querySelector('#image-link').value;

  const row = `<tr>
                  <td>
                    <input type="checkbox" id="delete" />
                  </td>
                  <td>
                    <input
                      type="text"
                      value=${title}
                      class="form-control form-control-sm title"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value=${link}
                      class="form-control form-control-sm link"
                    />
                  </td>
                </tr>`;
  $('.images').append(row);
});

// Delete selected images
document
  .getElementById('delete-selected-images')
  .addEventListener('click', async () => {
    try {
      let list = Array.from(document.querySelectorAll('input[type="checkbox"]'))
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value)
        .join();

      console.log(list);
      // const formData = new
    } catch (err) {
      console.log(err);
    }
  });

// Send update fest request
document.getElementById('update-fest').addEventListener('click', async () => {
  try {
    const fest = document.querySelector('#fest').value;
    const name = document.querySelector('#name').value;
    const year = document.querySelector('#year').value;
    const theme = document.querySelector('#theme').value;
    const titles = [...document.querySelectorAll('.title')]
      .map((title) => title.value)
      .join();
    const links = [...document.querySelectorAll('.link')]
      .map((link) => link.value)
      .join();

    const formData = new FormData();

    formData.append('fest', fest);
    formData.append('name', name);
    formData.append('year', year);
    formData.append('theme', theme);
    formData.append('titles', titles);
    formData.append('links', links);
    // TODO: Request to backend
  } catch (err) {
    console.log(err);
  }
});
