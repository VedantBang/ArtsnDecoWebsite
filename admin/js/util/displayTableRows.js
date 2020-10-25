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
                      class="form-control form-control-sm stat"
                      placeholder="Enter Stat. (for eg. 28L of paint used in Waves18')"
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-sm btn-danger safari-issue"
                      onclick="deleteFromDom(this)"
                      onmouseenter="deleteStatWarning()"
                      onmouseleave="removeDeleteStatWarning()"
                    >
                      <i class="fas fa-trash alt"></i>
                    </button>
                  </td>
                </tr>`;
  $('#stats').append(row);
};

// Warning message
const deleteWarning = () => {
  document.querySelector('.delete-warning-alert').style.visibility = 'visible';
};

const removeDeleteWarning = () => {
  document.querySelector('.delete-warning-alert').style.visibility = 'hidden';
};

const deleteStatWarning = () => {
  document.querySelector('.delete-stat-warning-alert').style.visibility =
    'visible';
};

const removeDeleteStatWarning = () => {
  document.querySelector('.delete-stat-warning-alert').style.visibility =
    'hidden';
};

// Deleting row from DOM
function deleteFromDom(r) {
  r.parentNode.parentNode.remove();
}
