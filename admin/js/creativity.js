// Adding input fields on clicking add-creative-artworks button
document
  .getElementById('add-creative-artworks')
  .addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.delete-button').style.display = 'inline';
    displayTableRows();

    // Toggling Delete message warning on mouse hover and deleting images from DOM
    deleteSelected();

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

      const response = await (
        await fetch(`${url}/creative/add`, {
          method: 'POST',
          headers: { token: `${localStorage.getItem('token')}` },
          body: formData,
        })
      ).json();

      if (response.ok) {
        window.location.href = 'creativity.html';
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

    for (let i = 0; i < response.data.length; i++) {
      const row = `<tr>
                      <td>
                        <input type="checkbox" value=${response.data[i]._id} />
                      </td>
                      <td>${i + 1}</td>
                      <td>
                        <input
                          type="text"
                          value=${response.data[i].title}
                          class="form-control form-control-sm title"
                          placeholder="Enter Title"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value=${response.data[i].link}
                          class="form-control form-control-sm link"
                          placeholder="Enter Image Link"
                        />
                      </td>
                      <td>
                        <button
                          class="btn btn-success btn-sm"
                          id=${response.data[i]._id}
                        >
                          Save
                      </button>
                      </td>
                    </tr>`;
      $('#creativity').append(row);
    }
  } catch (err) {
    console.log(err);
  }
})();

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

      const response = await (
        await fetch(`${url}/creative/delete`, {
          method: 'DELETE',
          headers: { token: `${localStorage.getItem('token')}` },
          body: formData,
        })
      ).json();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  });
