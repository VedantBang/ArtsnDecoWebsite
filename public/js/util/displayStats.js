const displayStats = async () => {
  try {
    const response = await (
      await fetch(`${url}/stats/all`, { method: 'GET' })
    ).json();

    // console.log(response);

    // typeWriter(response.lines[0]);

    for (let i = 0; i < response.lines.length; i++) {
      // if (response.lines[i]) {
      //   typeWriter(`${response.lines[i]}`);
      // }
      const stat = `<h1 class="stat text-center">${response.lines[i]}</h1>`;
      $('.stats').append(stat);
    }
  } catch (err) {
    console.log(err);
  }
};

// let i = 0,
//   speed = 50;
// let txt = 'Is this working?';
// const typeWriter = () => {
//   if (i < txt.length) {
//     document.querySelector('.stats').innerHTML += txt.charAt(i);
//     i++;

//     setTimeout(typeWriter, speed);
//   }
//   // $('.stats').append(stat);
// };

// typeWriter();
