// Check if user can access settings or not
fetch(`${url}/user/verifytoken`, {
  method: 'GET',
  headers: {
    token: `${localStorage.getItem('token')}`,
  },
})
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    if (!res.ok) {
      window.location.href = '/login.html';
    }
  })
  .catch((err) => {
    console.log(err);
  });

// Change Password
document.getElementById('change-password').addEventListener('click', () => {
  const password = document.querySelector('#new-password').value;
  const confirmPassword = document.querySelector('#confirm-password').value;

  // Check if passwords entered are same or not
  if (password === confirmPassword) {
    document.querySelector('#error-message').style.display = 'none';
    const formData = new FormData();

    formData.append('password', password);

    fetch(`${url}/user/updatepass`, {
      method: 'PUT',
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
          document.querySelector('.change-password').style.display = 'block';
        } else {
          document.getElementById('error-message').innerHTML = res.error;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    document.querySelector('#error-message').style.display = 'block';
    document.querySelector('.change-password').style.display = 'none';
  }
});

// Logging out
document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('token');
});
