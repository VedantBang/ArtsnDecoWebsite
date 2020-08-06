const waves = document.querySelector('#waves').value;
const quark = document.querySelector('#quark').value;
const spree = document.querySelector('#spree').value;
const other = document.querySelector('#other').value;

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

      console.log(list);

      const formData = new FormData();

      formData.append('list', list);

      for (let list of formData.entries()) {
        console.log(list[0] + ', ' + list[1]);
      }
      const response = await (
        await fetch(`${url}/change/deletefest`, {
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
