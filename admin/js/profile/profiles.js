// Sending new profile data to backend
document
  .getElementById('add-new-profile')
  .addEventListener('click', async (e) => {
    try {
      e.preventDefault();
      const name = document.querySelector('#name').value;
      const post = document.querySelector('#post').value;
      const insta = document.querySelector('#insta-link').value;
      const facebook = document.querySelector('#facebook-link').value;
      const image = document.querySelector('#image-link').value;

      const formData = new FormData();

      formData.append('name', name);
      formData.append('post', post);
      formData.append('insta', insta);
      formData.append('facebook', facebook);
      formData.append('image', image);

      spinner('.added-profile');

      const response = await (
        await fetch(`${url}/profile/add`, {
          method: 'POST',
          headers: { token: `${localStorage.getItem('token')}` },
          body: formData,
        })
      ).json();

      $('.added-profile').empty();

      if (response.ok) {
        window.location.href = 'profiles.html';
      } else {
        document.querySelector('.add-profile-error-alert').style.display =
          'block';
      }
    } catch (err) {
      console.log(err);
    }
  });

// Getting existing profiles from backend
(async () => {
  try {
    const response = await (
      await fetch(`${url}/profile/all`, { method: 'GET' })
    ).json();

    if (response.data.length) {
      for (let i = 0; i < response.data.length; i++) {
        const row = `<tr>
                      <td>${i + 1}</td>
                      <td>
                        ${response.data[i].name}
                      </td>
                      <td>
                        ${response.data[i].post}
                      </td>
                      <td>
                        <a
                          type="button"
                          class="btn btn-sm btn-success safari-issue"
                          href="update-profile.html"
                          onclick="updateProfile('${response.data[i]._id}')"
                        >
                          <i class="fas fa-edit"></i>
                        </a>
                        <button 
                          type="button"
                          class="btn btn-sm btn-danger safari-issue"
                          onclick="deleteProfile('${response.data[i]._id}')"
                          data-toggle="modal"
                          data-target="#delete-profiles-modal"
                        >
                          <i class="fas fa-trash alt"></i>
                      </td>
                    </tr>`;
        $('#profile').append(row);
      }
    } else {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.setAttribute('colspan', 5);
      td.classList.add('text-center');
      td.innerText = 'No Profile added yet!';
      tr.appendChild(td);
      document.querySelector('#profile').appendChild(tr);
    }
  } catch (err) {
    console.log(err);
  }
})();

// Setting profile id to local storage for deleting
const deleteProfile = (profileId) => {
  localStorage.setItem('profileId', profileId);
};

// Setting profile id to local storage for updating
const updateProfile = (profileId) => {
  localStorage.setItem('profileId', profileId);
};

// Deleting selected profiles
document
  .getElementById('delete-selected-profiles')
  .addEventListener('click', async () => {
    try {
      const formData = new FormData();

      formData.append('list', localStorage.getItem('profileId'));

      spinner('.delete-loading');

      const response = await (
        await fetch(`${url}/profile/delete`, {
          method: 'DELETE',
          headers: { token: `${localStorage.getItem('token')}` },
          body: formData,
        })
      ).json();

      $('.delete-loading').empty();

      if (response.ok) {
        window.location.href = 'profiles.html';
        localStorage.removeItem('profileId');
      } else {
        document.querySelector('.profiles-delete-error-alert').style.display =
          'block';
      }
    } catch (err) {
      console.log(err);
    }
  });
