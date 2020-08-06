// Get existing photos from backend
let selectedImages = '';
document.querySelector('#error-delete-images').style.display = 'none';

document.getElementById('get-existing-photos').addEventListener(
  'click',
  () => {
    const fest = document.querySelector('#fest').value;
    const year = document.querySelector('#year').value;
    const name = document.querySelector('#name').value;

    const formData = new FormData();

    formData.append('fest', fest);
    formData.append('year', year);
    formData.append('name', name);

    fetch(`${url}/display/fest`, {
      method: 'POST',
      body: formData,
      headers: {
        token: `${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.ok) {
          // Checking if images are null
          if (res.data.images.length === 0) {
            document.querySelector('.no-images').style.display = 'block';
          } else {
            //  Adding Image cards to display
            for (let i = 0; i < res.data.images.length; i++) {
              // Creating Card to display
              let displayImages = `<div 
                                class="col-md-4 col-sm-6 p-3" 
                               >
                                <div 
                                  class="card card-common display-card"
                                  id="${res.data.images[i].link}">
                                    <img 
                                      src="${res.data.images[i].link}" 
                                      alt="${res.data.images[i].title}" 
                                      class="card-img-top"
                                    />
                                <div class="card-footer text-dark text-center">
                                    <p>${res.data.images[i].title}</p>
                                </div>
                               </div>`;

              // Appending cards to parent div
              $('.display-images').append(displayImages);
            }

            // Showing DOM elements on display of cards
            document.querySelector('.caution').style.display = 'block';
            document.querySelector('.display-existing-images').style.display =
              'block';
            document.querySelector('.delete-option').style.display = 'block';

            // Selecting cards to delete
            for (let i = 0; i < res.data.images.length; i++) {
              document
                .getElementById(`${res.data.images[i].link}`)
                .addEventListener('click', () => {
                  // Toggling selected-card class
                  document
                    .getElementById(`${res.data.images[i].link}`)
                    .classList.toggle('selected-card');
                });
            }

            // Sending selected images to backend to delete
            document
              .getElementById('delete-images')
              .addEventListener('click', () => {
                // Taking images selected and adding to selectedImages string
                for (let i = 0; i < res.data.images.length; i++) {
                  if (
                    document
                      .getElementById(`${res.data.images[i].link}`)
                      .classList.contains('selected-card')
                  ) {
                    document.getElementById(
                      `${res.data.images[i].link}`
                    ).style.display = 'none';
                    selectedImages += `${res.data.images[i].link}` + ',';
                  }
                }

                const newSelectedImages = selectedImages.slice(0, -1);
                const fest = document.querySelector('#fest').value;
                const year = document.querySelector('#year').value;
                const name = document.querySelector('#name').value;

                const formData = new FormData();

                formData.append('remove', newSelectedImages);
                formData.append('fest', fest);
                formData.append('year', year);
                formData.append('name', name);

                fetch(`${url}/change/removeImages`, {
                  method: 'PUT',
                  body: formData,
                  headers: {
                    token: `${localStorage.getItem('token')}`,
                  },
                })
                  .then((res) => {
                    return res.json();
                  })
                  .then((res) => {
                    if (res.ok) {
                      document.querySelector(
                        '.delete-successful'
                      ).style.display = 'block';
                      document.querySelector(
                        '#error-delete-images'
                      ).style.display = 'none';
                    } else {
                      document.querySelector(
                        '#error-delete-images'
                      ).style.display = 'block';
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
          }
        } else {
          document.getElementById('error-get-existing-photos').innerHTML =
            res.error;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  { once: true }
);
