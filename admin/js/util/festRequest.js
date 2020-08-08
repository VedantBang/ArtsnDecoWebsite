const festRequest = (fest) => {
  document.getElementById(`${fest}`).addEventListener('click', async (e) => {
    try { 
      $('#fests').empty();

      const loading = document.createElement('i');
      loading.classList.add('fas', 'fa-spinner', 'fa-spin');
      $('.loading').append(loading);

      const response = await (
        await fetch(`${url}/display/${fest}`, { method: 'GET' })
      ).json();

      loading.remove();

      displayFestList(response.data);
    } catch (err) {
      console.log(err);
    }
  });
};
