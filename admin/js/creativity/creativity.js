// Adding input fields on clicking add-creative-artworks button
document
  .getElementById('add-creative-artworks')
  .addEventListener('click', (e) => {
    e.preventDefault();
    displayTableRows();

    // Showing save button to DOM
    document.querySelector('#add-new-creative-works').style.visibility =
      'visible';
  });

// Request for adding creative works
document
  .getElementById('add-new-creative-works')
  .addEventListener('click', async (e) => {
    try {
      e.preventDefault();
      const titles = [...document.querySelectorAll('.title')]
        .map((title) => title.value)
        .join();
      const links = [...document.querySelectorAll('.link')]
        .map((link) => link.value)
        .join();

      const formData = new FormData();

      formData.append('titles', titles);
      formData.append('links', links);

      spinner('.added-creativity');

      const response = await (
        await fetch(`${url}/creative/add`, {
          method: 'POST',
          headers: { token: `${localStorage.getItem('token')}` },
          body: formData,
        })
      ).json();

      $('.added-creativity').empty();

      if (response.ok) {
        window.location.href = 'creativity.html';
      } else {
        document.querySelector('.add-creativity-error-alert').style.display =
          'block';
      }
    } catch (err) {
      console.log(err);
    }
  });

// Adding All creative works to table from backend
(async () => {
  try {
    const response = await (
      await fetch(`${url}/creative/all`, { method: 'GET' })
    ).json();

    if (response.data.length) {
      document.querySelector('#delete-creativity-button').style.display =
        'inline';
      for (let i = 0; i < response.data.length; i++) {
        const row = `<tr>
                      <td>
                        <input type="checkbox" value=${response.data[i]._id} />
                      </td>
                      <td>${i + 1}</td>
                      <td>
                        <input
                          type="text"
                          value="${response.data[i].title}"
                          class="form-control form-control-sm"
                          id="title-${response.data[i]._id}"
                          placeholder="Enter Title"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value="${response.data[i].link}"
                          class="form-control form-control-sm"
                          id="link-${response.data[i]._id}"
                          placeholder="Enter Image Link"
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-success btn-sm safari-issue"
                          onclick="updateCreativity('${response.data[i]._id}')"
                        >
                          Save
                      </button>
                      </td>
                    </tr>`;
        $('#creativity').append(row);
      }
    } else {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.setAttribute('colspan', 5);
      td.classList.add('text-center');
      td.innerText = 'No creativity added yet!';
      tr.appendChild(td);
      document.querySelector('#creativity').appendChild(tr);
    }
  } catch (err) {
    console.log(err);
  }
})();

// Sending update request to backend
const updateCreativity = async (creativeId) => {
  try {
    const title = document.querySelector(`#title-${creativeId}`).value;
    const link = document.querySelector(`#link-${creativeId}`).value;

    const formData = new FormData();

    formData.append('_id', creativeId);
    formData.append('title', title);
    formData.append('link', link);

    spinner('.loading');

    const response = await (
      await fetch(`${url}/creative/update`, {
        method: 'PUT',
        headers: { token: `${localStorage.getItem('token')}` },
        body: formData,
      })
    ).json();

    $('.loading').empty();

    if (response.ok) {
      document.querySelector('.update-creativity-alert').style.visibility =
        'visible';
      setTimeout(
        () =>
          (document.querySelector('.update-creativity-alert').style.visibility =
            'hidden'),
        1000
      );
    } else {
      document.querySelector('.creativity-update-error-alert').style.display =
        'block';
    }
  } catch (err) {
    console.log(err);
  }
};

// Sending delete request to backend
document
  .getElementById('delete-creative-artwork')
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
        await fetch(`${url}/creative/delete`, {
          method: 'DELETE',
          headers: { token: `${localStorage.getItem('token')}` },
          body: formData,
        })
      ).json();

      $('.delete-loading').empty();

      if (response.ok) {
        window.location.href = 'creativity.html';
      } else {
        document.querySelector('.creativity-delete-error-alert').style.display =
          'block';
      }
    } catch (err) {
      console.log(err);
    }
  });
