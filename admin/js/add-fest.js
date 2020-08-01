// Adding title and image name to Selected Images list and reseting add artwork form
const displayImages = document.getElementById('display-images');
document.getElementById('add-artwork').addEventListener('click', () => {
  const li = document.createElement('li');
  const title = document.querySelector('#title').value;
  const imageLink = document.querySelector('#upload-image').value;
  li.classList.add('list-group-item');
  li.textContent = `Title: ${title}, Image Link: ${imageLink}`;
  displayImages.appendChild(li);

  document.querySelector('#add-artwork-form').reset();
  document.querySelector('#upload-artwork').style.display = 'block';
});

// Uploading title and images to backend
document.getElementById('upload-artwork').addEventListener('click', (e) => {
  e.preventDefault();
  const fest = document.querySelector('#fest').value;
  const year = document.querySelector('#year').value;
  const name = document.querySelector('#name').value;
  const theme = document.querySelector('#theme').value;

  let li = document.getElementsByClassName('list-group-item');
  let title = '', link = '';
  for (let i = 0; i < li.length; i++) {
    title += li[i].innerHTML.split(',')[0].split(': ')[1] + ',';
    link += li[i].innerHTML.split(',')[1].split(': ')[1] + ',';
  }
  const newTitle = title.slice(0, -1);
  const newLink = link.slice(0, -1);
  console.log(newTitle);
  console.log(newLink);

  const formData = new FormData();

  formData.append('fest', fest);
  formData.append('year', year);
  formData.append('name', name);
  formData.append('theme', theme);
  formData.append('titles', newTitle);
  formData.append('links', newLink);

  fetch(`${url}/change/new`, {
    method: 'POST',
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
        document.querySelector('.upload-artwork').style.display = 'block';
      } else {
        document.getElementById('error-uploads').innerHTML = res.error;
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

