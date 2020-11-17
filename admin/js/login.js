// Send login credentials to backend
document.getElementById('login-button').addEventListener('click', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const formData = new FormData();

  formData.append('username', username);
  formData.append('password', password);

  spinner('.loading');

  fetch(`${url}/user/login`, {
    method: 'POST',
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      $('.loading').empty();

      if (res.ok) {
        localStorage.setItem('token', res.token);
        window.location.href = '/dashboard.html';
        document.querySelector('#error-message').style.display = 'none';
      } else {
        document.querySelector('#error-message').style.display = 'block';
      }
    })
    .catch((err) => {
      console.log(err);
    });

  document.querySelector('#login-form').reset();
});
