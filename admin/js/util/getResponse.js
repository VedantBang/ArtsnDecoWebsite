const getResponse = async (type) => {
  try {
    spinner('.loading');

    const response = await (
      await fetch(`${url}/user/${type}`, {
        method: 'GET',
        headers: { token: `${localStorage.getItem('token')}` },
      })
    ).json();

    $('.loading').empty();

    if (response.ok) {
      return response;
    } else {
      document.querySelector('.dashboard-cards-error-alert').style.display =
        'block';
    }
  } catch (err) {
    console.log(err);
  }
};
