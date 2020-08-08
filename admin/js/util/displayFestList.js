const displayFestList = (data) => {
  if (data.length) {
    document.querySelector('#delete-fest-button').style.display = 'inline';
    for (let i = 0; i < data.length; i++) {
      if (data[i].theme) {
        const row = `<tr>
                      <td>
                        <input type="checkbox" name="checkbox" value=${
                          data[i]._id
                        } />
                      </td>
                      <td>${i + 1}</td>
                      <td>${data[i].theme}</td>
                      <td>${data[i].year}</td>
                      <td>
                        <a
                          type="button"
                          href="update-fest.html"
                          class="btn btn-sm btn-success safari-issue"
                          onclick="update('${data[i]._id}')"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>`;
        $('#fests').append(row);
      } else if (data[i].name) {
        const row = `<tr>
                      <td>
                        <input type="checkbox" name="checkbox" value=${
                          data[i]._id
                        } />
                      </td>
                      <td>${i + 1}</td>
                      <td>${data[i].name}</td>
                      <td>${data[i].year}</td>
                      <td>
                        <a
                          type="button"
                          href="update-fest.html"
                          class="btn btn-sm btn-success safari-issue"
                          onclick="update('${data[i]._id}')"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>`;
        $('#fests').append(row);
      }
    }
  } else {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.setAttribute('colspan', 5);
    td.classList.add('text-center');
    td.innerText = 'No fest added yet!';
    tr.appendChild(td);
    document.querySelector('#fests').appendChild(tr);
    document.querySelector('#delete-fest-button').style.display = 'none';
  }
};

const update = (festId) => {
  localStorage.setItem('festId', festId);
};
