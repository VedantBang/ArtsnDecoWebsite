const displayStats = async () => {
    try {
        const response = await (
            await fetch(`${url}/stats/all`, { method: 'GET' })
        ).json();

        for (let i = 0; i < response.data.length; i++) {
            const stat = `<div class="col-md-3 col-sm-6 col-6 single-stat">
        <img src="${response.data[i].icon}" alt="stat icon" class="stats-icon">
        <h3 class="white-text"><span class="counter">${response.data[i].number}</span></h3>
        <span class="white-text">${response.data[i].text}</span>
    </div>`;

            $(`.stats-main-content`).append(stat);
        }
    } catch (err) {
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
        console.log(err);
    }
};
