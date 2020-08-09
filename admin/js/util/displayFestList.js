const displayFestList = (data, requestPath, deleteButtonId) => {
  if (data.length) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].theme) {
        const row = `<tr>
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
                          <i class="fas fa-edit"></i>
                        </a>
                        <button 
                          class="btn btn-sm btn-danger safari-issue"
                          onclick="deleteRequest(
                            '${data[i]._id}',
                            ${requestPath}, 
                          )"
                          onmouseenter="deleteFestWarning()"
                          onmouseleave="removeDeleteFestWarning()"
                        >
                          <i class="fas fa-trash alt"></i>
                        </button>
                      </td>
                    </tr>`;
        $('#fests').append(row);
      } else if (data[i].name) {
        const row = `<tr>
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
                          <i class="fas fa-edit"></i>
                        </a>
                        <button 
                          class="btn btn-sm btn-danger safari-issue"
                          onclick="deleteRequest(
                            '${data[i]._id}',
                            ${requestPath}, 
                          )"
                          onmouseenter="deleteFestWarning()"
                          onmouseleave="removeDeleteFestWarning()"
                        >
                          <i class="fas fa-trash alt"></i>
                        </button>
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
  }
};

// Warning message
const deleteFestWarning = () => {
  document.querySelector('.delete-fest-warning-alert').style.visibility =
    'visible';
};

const removeDeleteFestWarning = () => {
  document.querySelector('.delete-fest-warning-alert').style.visibility =
    'hidden';
};

// Storing festId to local storage
const update = (festId) => {
  localStorage.setItem('festId', festId);
};
