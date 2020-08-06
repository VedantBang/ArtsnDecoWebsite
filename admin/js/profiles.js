// Sending new user profile details to backend
document.getElementById('add-profile').addEventListener('click', () => {
  const name = document.querySelector('#name').value;
  const post = document.querySelector('#post').value;
  const link = document.querySelector('#link').value;
  const image = document.querySelector('#image').value;

  const formData = new FormData();

  formData.append('name', name);
  formData.append('post', post);
  formData.append('insta', link);
  formData.append('image', image);

  fetch(`${url}/profile/add`, {
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
        document.querySelector('.add-profile-successful').style.display =
          'block';
      } else {
        document.querySelector('#error-add-profile').style.display = 'block';
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// Getting existing profiles from backend
document.getElementById('show-existing-profiles').addEventListener(
  'click',
  () => {
    const displayProfiles = document.getElementById('display-profiles');

    fetch(`${url}/profile/min`, {
      method: 'GET',
      headers: {
        token: `${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.ok) {
          // Checking if Profile data is actually there
          if (res.data.length !== 0) {
            // Showing the existing profiles
            document.querySelector('.edit-profiles').style.display = 'block';

            // Adding list items in DOM
            for (let i = 0; i < res.data.length; i++) {
              const li = document.createElement('li');
              const name = res.data[i].name;
              li.classList.add('list-group-item');
              li.classList.add('list-group-item-dark');
              li.id = `${res.data[i]._id}`;
              li.textContent = `Profile Name: ${name}`;
              displayProfiles.appendChild(li);
            }

            // Selecting profile to update
            let selectedProfile = '';
            for (let i = 0; i < res.data.length; i++) {
              document.getElementById(`${res.data[i]._id}`).addEventListener(
                'click',
                () => {
                  // Toggling selected profile
                  document
                    .getElementById(`${res.data[i]._id}`)
                    .classList.toggle('choose-profile');
                },
                { once: true }
              );
            }

            // Sending selected profile to update in database
            document
              .getElementById('update-profile')
              .addEventListener('click', () => {
                for (let i = 0; i < res.data.length; i++) {
                  if (
                    document
                      .getElementById(`${res.data[i]._id}`)
                      .classList.contains('choose-profile')
                  ) {
                    selectedProfile = `${res.data[i]._id}`;
                  }
                }
                const updatedName = document.querySelector('#update-name')
                  .value;
                const updatedPost = document.querySelector('#update-post')
                  .value;
                const updatedLink = document.querySelector('#update-link')
                  .value;
                const updatedImage = document.querySelector('#update-image')
                  .value;

                const formData = new FormData();

                formData.append('_id', selectedProfile);

                // Adding only non-zero fields to formData
                if (updatedName !== '') {
                  formData.append('name', updatedName);
                }
                if (updatedPost !== '') {
                  formData.append('post', updatedPost);
                }
                if (updatedLink !== '') {
                  formData.append('insta', updatedLink);
                }
                if (updatedImage !== '') {
                  formData.append('image', updatedImage);
                }

                fetch(`${url}/profile/update`, {
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
                      document.querySelector(
                        '.update-profile-successful'
                      ).style.display = 'block';
                    } else {
                      document.querySelector(
                        '#error-update-profile'
                      ).style.display = 'block';
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
          } else {
            document.querySelector('.no-profiles').style.display = 'block';
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  { once: true }
);

// Getting existing profiles from backend
document.getElementById('show-existing-profiles-to-delete').addEventListener(
  'click',
  () => {
    const displayProfiles = document.getElementById(
      'display-profiles-to-delete'
    );

    fetch(`${url}/profile/min`, {
      method: 'GET',
      headers: {
        token: `${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.ok) {
          // Checking if Profile data is actually there
          if (res.data.length !== 0) {
            // Showing the existing profiles
            document.querySelector('.delete-profiles').style.display = 'block';

            // Adding list items in DOM
            for (let i = 0; i < res.data.length; i++) {
              const li = document.createElement('li');
              const name = res.data[i].name;
              li.classList.add('list-group-item');
              li.classList.add('list-group-item-action');
              li.classList.add('list-group-item-dark');
              li.id = `${res.data[i]._id}`;
              li.textContent = `Profile Name: ${name}`;
              displayProfiles.appendChild(li);
            }

            // Selecting profile to delete
            let selectedProfile = '';
            for (let i = 0; i < res.data.length; i++) {
              document
                .getElementById(`${res.data[i]._id}`)
                .addEventListener('click', () => {
                  // Toggling selected profile
                  document
                    .getElementById(`${res.data[i]._id}`)
                    .classList.toggle('choose-profile');
                });
            }

            // Sending selected profiles to delete from database
            document
              .getElementById('delete-selected-profiles')
              .addEventListener('click', () => {
                for (let i = 0; i < res.data.length; i++) {
                  // Adding selected images to formData
                  if (
                    document
                      .getElementById(`${res.data[i]._id}`)
                      .classList.contains('choose-profile')
                  ) {
                    document.getElementById(
                      `${res.data[i]._id}`
                    ).style.display = 'none';
                    selectedProfile += `${res.data[i]._id}` + ',';
                  }
                }

                const newSelectedProfile = selectedProfile.slice(0, -1);

                const formData = new FormData();

                formData.append('ids', newSelectedProfile);

                fetch(`${url}/profile/delete`, {
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
                      document.querySelector(
                        '.delete-profiles-successful'
                      ).style.display = 'block';
                    } else {
                      document.querySelector(
                        '#error-delete-profiles'
                      ).style.display = 'block';
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
          } else {
            document.querySelector('.no-delete-profiles').style.display =
              'block';
          }
        } else {
          document.querySelector('#error-delete-profiles').style.display =
            'block';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  { once: true }
);
