const displayStats = async () => {
  try {
    const response = await (
      await fetch(`${url}/stats/all`, { method: 'GET' })
    ).json();

    for (let i = 0; i < response.lines.length; i++) {
      const stat = `<div class="stat text-center">${response.lines[i]}</div>`;
      $(`.stats`).append(stat);
    }

    // console.log(response.lines);

    // for (let i = 0; i < response.lines.length; i++) {
    //   const stat = document.createElement('div');
    //   stat.classList.add('stat', 'text-center');
    //   stat.id = `stat${i}`;
    //   $('.stats').append(stat);
    // }

    // let stringCount = 0,
    //   speed = 50;

    // function statClosure(text) {
    //   let txt = text;

    //   console.log(txt);

    //   let i = 0;

    //   function typeWriter() {
    //     let stringCountContext = stringCount;
    //     if (i < txt.length) {
    //       if (document.getElementById(`stat${stringCountContext}`)) {
    //         document.getElementById(
    //           `stat${stringCountContext}`
    //         ).innerText += txt.charAt(i);
    //         i++;
    //         setTimeout(typeWriter, speed);
    //       }
    //     }
    //   }

    //   stringCount++;
    //   return typeWriter;
    // }

    // for (let i = 0; i < response.lines.length; i++) {
    //   statClosure(response.lines[i])();
    // }
  } catch (err) {
    console.log(err);
  }
};
