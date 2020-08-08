const getResponse = async (type) => {
  try {
    const response = await (
      await fetch(`${url}/user/${type}`, {
        method: 'GET',
        headers: { token: `${localStorage.getItem('token')}` },
      })
    ).json();

    return response;
  } catch (err) {
    console.log(err);
  }
};
