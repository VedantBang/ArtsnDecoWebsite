// Getting existing data for selected profile from backend
(async () => {
  try {
    const response = await (
      await fetch(`${url}/profile/id/${localStorage.getItem('profileId')}`, {
        method: 'GET',
        headers: { token: `${localStorage.getItem('token')}` },
      })
    ).json();

    console.log(response);

    document.querySelector('#name').value = response.data.name;
    document.querySelector('#post').value = response.data.post;
    document.querySelector('#insta-link').value = response.data.insta;
    document.querySelector('#facebook-link').value = response.data.facebook;
    document.querySelector('#image-link').value = response.data.image;
    document.querySelector('#visible').checked = Boolean(response.data.visible);
    const visible = document.querySelector('#visible').checked;
    if (visible) {
      document.querySelector('#contact').value = response.data.contact;
      document.querySelector('.contact-number').style.display = 'block';
    }
  } catch (err) {
    console.log(err);
  }
})();

// Adding contact field on checked
document.getElementById('visible').addEventListener('click', () => {
  const visible = document.querySelector('#visible').checked;

  if (visible) {
    document.querySelector('.contact-number').style.display = 'block';
  } else {
    document.querySelector('.contact-number').style.display = 'none';
  }
});

// Sending updated profile data to backend
document
  .getElementById('update-profile')
  .addEventListener('click', async (e) => {
    try {
      e.preventDefault();
      const name = document.querySelector('#name').value;
      const post = document.querySelector('#post').value;
      const insta = document.querySelector('#insta-link').value;
      const facebook = document.querySelector('#facebook-link').value;
      const image = document.querySelector('#image-link').value;
      let visible = document.querySelector('#visible').checked;
      visible = visible ? 1 : 0;
      const contact = document.querySelector('#contact').value;

      const formData = new FormData();

      formData.append('name', name);
      formData.append('post', post);
      formData.append('insta', insta);
      formData.append('facebook', facebook);
      formData.append('image', image);
      formData.append('visible', visible);
      formData.append('contact', contact);
      formData.append('_id', localStorage.getItem('profileId'));

      spinner('.updated-profile');

      const response = await (
        await fetch(`${url}/profile/update`, {
          method: 'PUT',
          headers: { token: `${localStorage.getItem('token')}` },
          body: formData,
        })
      ).json();

      $('.updated-profile').empty();

      if (response.ok) {
        localStorage.removeItem('profileId');
        window.location.href = 'profiles.html';
      } else {
        document.querySelector('.update-profile-error-alert').style.display =
          'block';
      }
    } catch (err) {
      console.log(err);
    }
  });

// Deleting profile id from local storage
const deleteProfileId = () => {
  localStorage.removeItem('profileId');
};
