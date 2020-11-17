// Getting storage used from backend
(async () => {
  try {
    document.querySelector('#storage').innerHTML = `${
      Math.floor(
        ((await getResponse('storage')).bytes / (1024 * 1024)) * 1000
      ) / 1000
    } / 512 MB`;
    document.querySelector('#images').innerHTML = (
      await getResponse('images')
    ).total;
    document.querySelector('#total-visits').innerHTML = (
      await getResponse('totalvisits')
    ).visits;
  } catch (err) {
    console.log(err);
  }
})();
