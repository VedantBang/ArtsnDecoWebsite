// Getting storage used from backend
(async () => {
  try {
    document.querySelector('#storage').innerHTML = `${
      Math.floor(
        ((await getResponse('storage')).bytes / (1024 * 1024)) * 1000
      ) / 1000
    } / 512 MB`;
    document.querySelector('#images').innerHTML = (
      await getResponse('images')
    ).total;
    document.querySelector('#total-visits').innerHTML = (
      await getResponse('totalvisits')
    ).visits;
  } catch (err) {
    console.log(err);
  }
})();

// Adding input fields on clicking add-stats button
document.getElementById('add-stats').addEventListener('click', (e) => {
  e.preventDefault();
  displayStatTableRows();

  // Showing save button to DOM
  document.querySelector('#add-new-stats').style.visibility = 'visible';
});

// Request for adding creative works
document
  .getElementById('add-new-stats')
  .addEventListener('click', async (e) => {
    try {
      e.preventDefault();
      const lines = [...document.querySelectorAll('.stat')]
        .map((title) => title.value)
        .join();

      console.log(lines);

      const formData = new FormData();

      formData.append('lines', lines);

      spinner('.added-stats');

      const response = await (
        await fetch(`${url}/stats/update`, {
          method: 'PUT',
          headers: { token: `${localStorage.getItem('token')}` },
          body: formData,
        })
      ).json();

      $('.added-stats').empty();

      if (response.ok) {
        window.location.href = 'dashboard.html';
      } else {
        document.querySelector('.add-stats-error-alert').style.display =
          'block';
      }
    } catch (err) {
      console.log(err);
    }
  });
