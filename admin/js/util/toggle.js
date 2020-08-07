// Adding name field in case of "Others" option in upload form
document.getElementById('fest').addEventListener('click', () => {
  const fest = document.querySelector('#fest').value;
  const theme = document.querySelector('.theme');
  const name = document.querySelector('.name');

  if (fest === 'other') {
    if (name) {
      document.querySelector('.label-name-of-event').style.display = 'inline';
      document.querySelector('.input-name-of-event').style.display = 'inline';
    }
    if (theme) {
      document.querySelector('.label-theme-of-event').style.display = 'none';
      document.querySelector('.input-theme-of-event').style.display = 'none';
    }
  } else {
    if (name) {
      document.querySelector('.label-name-of-event').style.display = 'none';
      document.querySelector('.input-name-of-event').style.display = 'none';
    }
    if (theme) {
      document.querySelector('.label-theme-of-event').style.display = 'inline';
      document.querySelector('.input-theme-of-event').style.display = 'inline';
    }
  }
});
