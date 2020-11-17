// Adding input fields on clicking add-stats button
document.getElementById('add-stats').addEventListener('click', (e) => {
  e.preventDefault();
  displayStatTableRows();

  // Showing save button to DOM
  document.querySelector('#add-new-stats').style.visibility = 'visible';
});

// Request for adding stats
document
  .getElementById('add-new-stats')
  .addEventListener('click', async (e) => {
    try {
      e.preventDefault();
      const icons = [...document.querySelectorAll('.icon')]
        .map((title) => title.value)
        .join();
      const numbers = [...document.querySelectorAll('.number')]
        .map((link) => link.value)
        .join();
      const texts = [...document.querySelectorAll('.text')]
        .map((link) => link.value)
        .join();

      const formData = new FormData();

      formData.append('icons', icons);
      formData.append('numbers', numbers);
      formData.append('texts', texts);

      spinner('.added-stats');

      const response = await (
        await fetch(`${url}/stats/add`, {
          method: 'POST',
          headers: { token: `${localStorage.getItem('token')}` },
          body: formData,
        })
      ).json();

      $('.added-stats').empty();

      if (response.ok) {
        window.location.href = 'stats.html';
      } else {
        document.querySelector('.add-stats-error-alert').style.display =
          'block';
      }
    } catch (err) {
      console.log(err);
    }
  });

// Adding All stats to table from backend
(async () => {
  try {
    const response = await (
      await fetch(`${url}/stats/all`, { method: 'GET' })
    ).json();

    if (response.data.length) {
      for (let i = 0; i < response.data.length; i++) {
        const row = `<tr>
                      <td>${i + 1}</td>
                      <td>
                        <input
                          type="text"
                          value="${response.data[i].icon}"
                          class="form-control form-control-sm"
                          id="icon-${response.data[i]._id}"
                          placeholder="Enter Title"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value="${response.data[i].number}"
                          class="form-control form-control-sm"
                          id="number-${response.data[i]._id}"
                          placeholder="Enter Image Link"
                        />
                      </td>
                       <td>
                        <input
                          type="text"
                          value="${response.data[i].text}"
                          class="form-control form-control-sm"
                          id="text-${response.data[i]._id}"
                          placeholder="Enter Image Link"
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-success btn-sm safari-issue"
                          onclick="updatestats('${response.data[i]._id}')"
                        >
                          <i class="fas fa-save"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-sm btn-danger safari-issue"
                          onclick="deletestats('${response.data[i]._id}')"
                          data-toggle="modal"
                          data-target="#delete-stats-modal"
                        >
                          <i class="fas fa-trash alt"></i>
                        </button>
                      </td>
                    </tr>`;
        $('#stats').append(row);
      }
    } else {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.setAttribute('colspan', 5);
      td.classList.add('text-center');
      td.innerText = 'No stats added yet!';
      tr.appendChild(td);
      document.querySelector('#stats').appendChild(tr);
    }
  } catch (err) {
    console.log(err);
  }
})();

// Setting stats id to local storage
const deletestats = (statId) => {
  localStorage.setItem('statId', statId);
};

// Sending update request to backend
const updatestats = async (statId) => {
  try {
    const icon = document.querySelector(`#icon-${statId}`).value;
    const number = document.querySelector(`#number-${statId}`).value;
    const text = document.querySelector(`#text-${statId}`).value;

    const formData = new FormData();

    formData.append('_id', statId);
    formData.append('icon', icon);
    formData.append('number', number);
    formData.append('text', text);

    spinner('.loading');

    const response = await (
      await fetch(`${url}/stats/update`, {
        method: 'PUT',
        headers: { token: `${localStorage.getItem('token')}` },
        body: formData,
      })
    ).json();

    $('.loading').empty();

    if (response.ok) {
      document.querySelector('.update-stats-alert').style.visibility =
        'visible';
      setTimeout(
        () =>
          (document.querySelector('.update-stats-alert').style.visibility =
            'hidden'),
        1000
      );
    } else {
      document.querySelector('.stats-update-error-alert').style.display =
        'block';
    }
  } catch (err) {
    console.log(err);
  }
};

// Sending delete request to backend
document.getElementById('delete-stats').addEventListener('click', async () => {
  try {
    const formData = new FormData();

    formData.append('list', localStorage.getItem('statId'));

    spinner('.delete-loading');

    const response = await (
      await fetch(`${url}/stats/delete`, {
        method: 'DELETE',
        headers: { token: `${localStorage.getItem('token')}` },
        body: formData,
      })
    ).json();

    $('.delete-loading').empty();

    if (response.ok) {
      localStorage.removeItem('statId');
      window.location.href = 'stats.html';
    } else {
      document.querySelector('.stats-delete-error-alert').style.display =
        'block';
    }
  } catch (err) {
    console.log(err);
  }
});
