// Sending new profile data to backend
document
  .getElementById('add-new-profile')
  .addEventListener('click', async (e) => {
    try {
      e.preventDefault();
      const name = document.querySelector('#name').value;
      const post = document.querySelector('#post').value;
      const insta = document.querySelector('#insta-link').value;

      const formData = new FormData();

      formData.append('name', name);
      formData.append('post', post);
      formData.append('insta', insta);

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
      document.querySelector('#delete-profiles-button').style.display =
        'inline';
      for (let i = 0; i < response.data.length; i++) {
        const row = `<tr>
                      <td>
                        <input type="checkbox" value=${response.data[i]._id} />
                      </td>
                      <td>${i + 1}</td>
                      <td>
                        ${response.data[i].name}
                      </td>
                      <td>
                        ${response.data[i].post}
                      </td>
                      <td>
                        <a href=${response.data[i].insta} target="_blank">
                          Insta Link
                        </a>
                      </td>
                      <td>
                        <a
                          type="button"
                          class="btn btn-sm btn-success safari-issue"
                          href="update-profile.html"
                          onclick="updateProfile('${response.data[i]._id}')"
                        >
                          Edit
                        </a>
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

// Setting profile id to local storage
const updateProfile = (profileId) => {
  localStorage.setItem('profileId', profileId);
};

// Deleting selected profiles
document
  .getElementById('delete-selected-profiles')
  .addEventListener('click', async () => {
    try {
      let list = Array.from(document.querySelectorAll('input[type="checkbox"]'))
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value)
        .join();

      const formData = new FormData();

      formData.append('list', list);

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
      } else {
        document.querySelector('.profiles-delete-error-alert').style.display =
          'block';
      }
    } catch (err) {
      console.log(err);
    }
  });
