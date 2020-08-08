// Getting existing data for selected profile from backend
(async () => {
  try {
    const response = await (
      await fetch(`${url}/profile/id/${localStorage.getItem('profileId')}`, {
        method: 'GET',
        headers: { token: `${localStorage.getItem('token')}` },
      })
    ).json();

    console.log(response);
  } catch (err) {
    console.log(err);
  }
})();
