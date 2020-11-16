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
});

// Adding All stats to table from backend
(async () => {
  try {
    const response = await (
      await fetch(`${url}/stats/all`, { method: 'GET' })
    ).json();

    if (response.lines.length) {
      for (let i = 0; i < response.lines.length; i++) {
        const row = `<tr>
                      <td>${i + 1}</td>
                      <td>
                        <input
                          type="text"
                          value="${response.lines[i]}"
                          class="form-control form-control-sm stat"
                          placeholder="Enter Title"
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-sm btn-danger safari-issue"
                          onclick="deleteStatFromDom(this)"
                          onmouseenter="deleteStatWarning()"
                          onmouseleave="removeDeleteStatWarning()"
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

// Sending all the stats back to database
document.getElementById('save-stats').addEventListener('click', async (e) => {
  try {
    e.preventDefault();
    const lines = [...document.querySelectorAll('.stat')]
      .map((line) => line.value)
      .join();

    const formData = new FormData();

    formData.append('lines', lines);

    const response = await (
      await fetch(`${url}/stats/update`, {
        method: 'PUT',
        headers: { token: `${localStorage.getItem('token')}` },
        body: formData,
      })
    ).json();

    if (response.ok) {
      window.location.href = 'dashboard.html';
    } else {
      document.querySelector('.stats-update-error-alert').style.display =
        'block';
    }
  } catch (err) {
    console.log(err);
  }
});
