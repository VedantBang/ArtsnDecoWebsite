const displayTableRows = (title, link) => {
  if (title && link) {
    const row = `<tr>
                  <td>
                    <input
                      type="text"
                      value="${title}"
                      class="form-control form-control-sm title"
                      placeholder="Enter Title"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value="${link}"
                      class="form-control form-control-sm link"
                      placeholder="Enter Image Link"
                    />
                  </td>
                  <td>
                    <button 
                      class="btn btn-sm btn-danger"
                      onclick="deleteFromDom(this)"
                      onmouseenter="deleteWarning()"
                      onmouseleave="removeDeleteWarning()"
                    >
                      <i class="fas fa-trash alt"></i>
                    </button>
                  </td>
                </tr>`;
    $('.images').append(row);
  } else {
    const row = `<tr>
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
                  <td>
                    <button
                      class="btn btn-sm btn-danger"
                      onclick="deleteFromDom(this)"
                      onmouseenter="deleteWarning()"
                      onmouseleave="removeDeleteWarning()"
                    >
                      <i class="fas fa-trash alt"></i>
                    </button>
                  </td>
                </tr>`;
    $('.images').append(row);
  }
};

const displayStatTableRows = () => {
  const row = `<tr>
                  <td></td>
                  <td>
                    <input
                      type="text"
                      class="form-control form-control-sm icon"
                      placeholder="Enter Icon"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control form-control-sm number"
                      placeholder="Enter Number"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control form-control-sm text"
                      placeholder="Enter Text"
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-sm btn-danger safari-issue"
                      onclick="deleteStatFromDom(this)"
                    >
                      <i class="fas fa-trash alt"></i>
                    </button>
                  </td>
                </tr>`;
  $('.stats').append(row);
};

// Warning message
const deleteWarning = () => {
  document.querySelector('.delete-warning-alert').style.visibility = 'visible';
};

const removeDeleteWarning = () => {
  document.querySelector('.delete-warning-alert').style.visibility = 'hidden';
};

// Deleting row from DOM
function deleteFromDom(r) {
  removeDeleteWarning();
  r.parentNode.parentNode.remove();
}

function deleteStatFromDom(r) {
  r.parentNode.parentNode.remove();
}
