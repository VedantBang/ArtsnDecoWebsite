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

      const formData = new FormData();

      formData.append('list', list);
      // TODO: Request to backend
    } catch (err) {
      console.log(err);
    }
  });
