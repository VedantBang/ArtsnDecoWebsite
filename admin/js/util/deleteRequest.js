const deleteRequest = async (_id, requestPath) => {
  try {
    console.log('hey');
    const formData = new FormData();

    formData.append('list', _id);

    spinner('.delete-loading');

    const response = await (
      await fetch(`${url}/${requestPath}`, {
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
};
