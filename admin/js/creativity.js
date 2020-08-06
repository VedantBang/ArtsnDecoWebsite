// Uploading name and image links to backend
document
  .getElementById('add-creative-artwork')
  .addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const image = document.querySelector('#upload-creative-image').value;

    const formData = new FormData();

    formData.append('name', name);
    formData.append('image', image);

    fetch(`${url}/creative/add`, {
      method: 'POST',
      body: formData,
      headers: {
        token: `${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          document.querySelector('.upload-creativity').style.display = 'block';
        } else {
          document.querySelector('#error-creative-uploads').style.display =
            'block';
        }
      })
      .catch((err) => console.log(err));
  });

// Getting existing images form backend
document.querySelector('#show-creative-artworks').addEventListener(
  'click',
  () => {
    fetch(`${url}/creative/all`, {
      method: 'GET',
      headers: {
        token: `${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          // Checking if creativity data is actually there
          if (res.data.length !== 0) {
            // Showing the existing creative works
            document.querySelector('.delete-creative-container').style.display =
              'block';

            console.log(res.data);
            // Adding list items in DOM
            for (let i = 0; i < res.data.length; i++) {
              let displayCreativeWorks = `<div class="col-lg-4 col-sm-6 p-3">
                                            <div 
                                              class="card card-common display-card"
                                              id="${res.data[i]._id}">
                                              <img 
                                                src="http://localhost:3000/${res.data[i].image}"
                                                alt="${res.data[i].name}"
                                                class="card-img-top"
                                              />
                                            <div class="card-footer text-dark text-center">
                                              <p>${res.data[i].name}</p>
                                            </div>
                                          </div>`;

              // Appending cards to parent div
              $('.display-creative-works').append(displayCreativeWorks);
            }

            // Selecting card to delete
            let selectedCreativeWork = '';
            for (let i = 0; i < res.data.length; i++) {
              document.getElementById(`${res.data[i]._id}`).addEventListener(
                'click',
                () => {
                  // Toggling for selecting a card
                  document
                    .getElementById(`${res.data[i]._id}`)
                    .classList.toggle('choose-creative-artwork');
                },
                { once: true }
              );
            }

            // Sending selected creative work to delete from database
            document
              .getElementById('delete-creative-artwork')
              .addEventListener('click', () => {
                for (let i = 0; i < res.data.length; i++) {
                  if (
                    document
                      .getElementById(`${res.data[i]._id}`)
                      .classList.contains('choose-creative-artwork')
                  ) {
                    document.getElementById(
                      `${res.data[i]._id}`
                    ).style.display = 'none';
                    selectedCreativeWork = `${res.data[i]._id}`;
                  }
                }

                const formData = new FormData();

                formData.append('id', selectedCreativeWork);

                fetch(`${url}/creative/delete`, {
                  method: 'DELETE',
                  body: formData,
                  headers: {
                    token: `${localStorage.getItem('token')}`,
                  },
                })
                  .then((res) => res.json())
                  .then((res) => {
                    if (res.ok) {
                      document.querySelector(
                        '.delete-creative-work-successful'
                      ).style.display = 'block';
                    } else {
                      document.querySelector(
                        '#error-delete-creative-work'
                      ).style.display = 'block';
                    }
                  })
                  .catch((err) => console.log(err));
              });
          } else {
            document.querySelector('.no-delete-creative-works').style.display =
              'block';
          }
        } else {
          document.querySelector(
            '#error-display-creative-works'
          ).style.display = 'block';
        }
      })
      .catch((err) => console.log(err));
  },
  { once: true }
);
