const displayStats = async () => {
  try {
    const response = await (
      await fetch(`${url}/stats/all`, { method: 'GET' })
    ).json();

    for (let i = 0; i < response.lines.length; i++) {
      const stat = `<h1 class="fests-managed text-center">${response.lines[i]}</h1>`;
      $('.stats').append(stat);
    }
  } catch (err) {
    console.log(err);
  }
};
