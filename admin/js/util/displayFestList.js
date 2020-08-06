const displayFestList = (data) => {
  for (let i = 0; i < data.length; i++) {
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
  }
};

const update = (festId) => {
  localStorage.setItem('festId', festId);
};
