const waves = document.querySelector('#waves').id;
const quark = document.querySelector('#quark').id;
const spree = document.querySelector('#spree').id;
const other = document.querySelector('#other').id;

// Initial message
const tr = document.createElement('tr');
const td = document.createElement('td');
td.setAttribute('colspan', 5);
td.classList.add('text-center');
td.innerText = 'Please select a Fest to edit';
tr.appendChild(td);
document.querySelector('#fests').appendChild(tr);

festRequest(waves);
festRequest(quark);
festRequest(spree);
festRequest(other);

// Deleting selected fests
document
  .getElementById('delete-selected-fests')
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
        await fetch(`${url}/change/deletefest`, {
          method: 'DELETE',
          headers: { token: `${localStorage.getItem('token')}` },
          body: formData,
        })
      ).json();

      $('.delete-loading').empty();

      if (response.ok) {
        window.location.href = 'fests.html';
      } else {
        document.querySelector('.fests-delete-error-alert').style.display =
          'block';
      }
    } catch (err) {
      console.log(err);
    }
  });
