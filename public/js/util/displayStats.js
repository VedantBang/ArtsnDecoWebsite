const displayStats = async () => {
  try {
    const response = await (
      await fetch(`${url}/stats/all`, { method: 'GET' })
    ).json();

    let regex = /^\d+(\.\d{1,2})?$/;

    for (let i = 0; i < response.data.length; i++) {
      const text = response.data[i].number
        .split('')
        .filter((item) => !item.match(regex))
        .join('');
      const number = response.data[i].number
        .split('')
        .filter((item) => item.match(regex))
        .join('');
      const stat = `<div class="col-md-3 col-sm-6 col-6 single-stat">
  <img src="${response.data[i].icon}" alt="stat icon" class="stats-icon" />
  <h3 class="white-text">
    <span id="stat-${i}"></span>
    <span class="counter-text">${text}</span>
  </h3>
  <span class="white-text">${response.data[i].text}</span>
</div>`;

      $(`.stats-main-content`).append(stat);

      animateValue(document.getElementById(`stat-${i}`), 0, number, 4000);
    }
  } catch (err) {
    console.log(err);
  }
};

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.classList.add('counter');
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}
