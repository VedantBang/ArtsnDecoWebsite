const festRequest = (fest) => {
  document.getElementById(`${fest}`).addEventListener('click', async () => {
    try {
      $('#fests').empty();

      const response = await (
        await fetch(`${url}/display/${fest}`, { method: 'GET' })
      ).json();

      displayFestList(response.data);
    } catch (err) {
      console.log(err);
    }
  });
};
