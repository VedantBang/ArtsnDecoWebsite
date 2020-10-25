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

const displayStatTableRows = (stat) => {
  if (stat) {
    const row = `<tr>
                  <td>
                    <input
                      type="text"
                      value="${stat}"
                      class="form-control form-control-sm stats"
                      placeholder="Enter Title"
                    />
                  </td>
                </tr>`;
    $('.stats').append(row);
  } else {
    const row = `<tr>
                  <td>
                    <input
                      type="text"
                      class="form-control form-control-sm stat"
                      placeholder="Enter Stat. (for eg. 28L of paint used in Waves18')"
                    />
                  </td>
                </tr>`;
    $('.stats').append(row);
  }
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
  r.parentNode.parentNode.remove();
}
