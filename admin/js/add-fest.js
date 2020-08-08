// Add new input field on clicking add artwork button
document.getElementById('add-artwork').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.delete-button').style.display = 'inline';
  displayTableRows();

  // Toggling Delete message warning on mouse hover and deleting images from DOM
  deleteSelected();

  // Showing save button to DOM
  document.querySelector('#add-new-fest').style.visibility = 'visible';
});

// Uploading new fest details to backend
document.getElementById('add-new-fest').addEventListener('click', async (e) => {
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

    spinner('.added-fest');

    const response = await (
      await fetch(`${url}/change/new`, {
        method: 'POST',
        headers: { token: `${localStorage.getItem('token')}` },
        body: formData,
      })
    ).json();

    $('.added-fest').empty();

    if (response.ok) {
      document.querySelector('.add-new-fest-alert').style.display = 'block';
      window.location.href = 'fests.html';
    } else {
      document.querySelector('.add-new-fest-error-alert').style.display =
        'block';
    }
  } catch (err) {
    console.log(err);
  }
});
