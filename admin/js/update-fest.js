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
    if (response.data.name) {
      document.querySelector('.label-name-of-event').style.display = 'inline';
      document.querySelector('.input-name-of-event').style.display = 'inline';
      document.querySelector('#name').value = response.data.name;
      document.querySelector('.label-theme-of-event').style.display = 'none';
      document.querySelector('.input-theme-of-event').style.display = 'none';
    }

    // Setting Year
    document.querySelector('#year').value = response.data.year;

    // Setting Theme
    if (response.data.theme) {
      document.querySelector('.label-theme-of-event').style.display = 'inline';
      document.querySelector('.input-theme-of-event').style.display = 'inline';
      document.querySelector('#theme').value = response.data.theme;
      document.querySelector('.label-name-of-event').style.display = 'none';
      document.querySelector('.input-name-of-event').style.display = 'none';
    }

    // setting images added table
    for (let i = 0; i < response.data.images.length; i++) {
      displayTableRows(
        response.data.images[i].title,
        response.data.images[i].link
      );
    }
  } catch (err) {
    console.log(err);
  }
})();

// Adding new image to table
document.getElementById('add-image').addEventListener('click', (e) => {
  e.preventDefault();
  displayTableRows();
});

// Toggling Delete message warning on mouse hover
document
  .getElementById('delete-selected-images')
  .addEventListener('mouseenter', () => {
    document.querySelector('.delete-warning-alert').style.visibility =
      'visible';
  });
document
  .getElementById('delete-selected-images')
  .addEventListener('mouseleave', () => {
    document.querySelector('.delete-warning-alert').style.visibility = 'hidden';
  });

// Deleting selected images from DOM
document
  .getElementById('delete-selected-images')
  .addEventListener('click', (e) => {
    e.preventDefault();
    [...document.querySelectorAll('input[type="checkbox"]')].filter(
      (checkbox) => {
        if (checkbox.checked) {
          checkbox.parentNode.parentNode.remove();
        }
      }
    );
  });

// Send update fest request
document.getElementById('update-fest').addEventListener('click', async (e) => {
  try {
    e.preventDefault();
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
    formData.append('_id', localStorage.getItem('festId'));

    const response = await (
      await fetch(`${url}/change/update`, {
        method: 'PUT',
        headers: { token: `${localStorage.getItem('token')}` },
        body: formData,
      })
    ).json();
    console.log(response);
    if (response.ok) {
      window.location.href = 'edit-fest.html';
    }
  } catch (err) {
    console.log(err);
  }
});

// Deleting data from localstorage on clicking go-back
const deleteFestId = () => {
  localStorage.removeItem('festId');
};
