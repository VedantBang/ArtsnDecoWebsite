const displayTableRows = (title, link) => {
  if (title && link) {
    const row = `<tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <input
                      type="text"
                      value=${title}
                      class="form-control form-control-sm title"
                      placeholder="Enter Title"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value=${link}
                      class="form-control form-control-sm link"
                      placeholder="Enter Image Link"
                    />
                  </td>
                </tr>`;
    $('.images').append(row);
  } else {
    const row = `<tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control form-control-sm title"
                      placeholder="Enter Title"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control form-control-sm link"
                      placeholder="Enter Image Link"
                    />
                  </td>
                </tr>`;
    $('.images').append(row);
  }
};
