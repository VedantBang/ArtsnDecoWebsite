const festRequest = (fest) => {
  document.getElementById(`${fest}`).addEventListener('click', async (e) => {
    try {
      $('#fests').empty();

      spinner('.loading');

      const response = await (
        await fetch(`${url}/display/${fest}`, { method: 'GET' })
      ).json();

      $('.loading').empty();

      displayFestList(response.data);
    } catch (err) {
      console.log(err);
    }
  });
};
