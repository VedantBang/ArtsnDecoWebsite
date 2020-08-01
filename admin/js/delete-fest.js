// Deleteing fest from backend
document.getElementById('delete-fest-details').addEventListener('click', () => {
  const fest = document.querySelector('#fest').value;
  const name = document.querySelector('#name').value;
  const year = document.querySelector('#year').value;

  const formData = new FormData();

  formData.append('fest', fest);
  formData.append('name', name);
  formData.append('year', year);

  fetch(`${url}/change/delete`, {
    method: 'DELETE',
    body: formData,
    headers: {
      token: `${localStorage.getItem('token')}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.ok) {
        document.querySelector('.delete-fest-successful').style.display =
          'block';
      } else {
        document.querySelector('#error-delete-fest').innerHTML = res.error;
      }
    })
    .catch((err) => {
      console.log(err);
    });
});