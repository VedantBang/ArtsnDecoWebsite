// Declaring  section heights in an array
const heights = [
  document.querySelector('.hero-section').offsetHeight,
  document.querySelector('#about-us').offsetHeight,
  document.querySelector('#creativity').offsetHeight,
  document.querySelector('#team').offsetHeight,
  document.querySelector('.footer').offsetHeight,
];

// Boolean array
const done = [false, false, false, false, false, false];

// Page Visit to backend
fetch(`${url}/user/visit`);

// Changing webpage on scroll (lazy loading implementation)
const lazyLoading = () => {
  window.onscroll = () => {
    // Change socials sidebar
    if (window.pageYOffset > 300) {
      document.querySelector('.socials-f').style.color = '#2a375e';
      document.querySelector('.socials-b').style.color = '#2a375e';
      document.querySelector('.socials-i').style.color = '#2a375e';
      document.querySelector('.social-line').style.background = '#2a375e';
      document.querySelector('.socials-text').style.color = '#2a375e';
    } else {
      document.querySelector('.socials-f').style.color = '#fff';
      document.querySelector('.socials-b').style.color = '#fff';
      document.querySelector('.socials-i').style.color = '#fff';
      document.querySelector('.social-line').style.background = '#fff';
      document.querySelector('.socials-text').style.color = '#fff';
    }
    // Hide socials sidebar
    if (
      window.pageYOffset >
      heights[0] +
        heights[1] +
        heights[2] +
        heights[3] +
        heights[4] +
        heights[5]
    ) {
      document.querySelector('.socials-sidebar').style.visibility = 'hidden';
    } else {
      document.querySelector('.socials-sidebar').style.visibility = 'visible';
    }
    // Getting stats on appropriate scrolling
    if (window.pageYOffset > heights[0] && !done[2]) {
      displayStats();
      done[2] = true;
    }
    // Getting creative works data on appropriate scrolling
    if (window.pageYOffset > heights[0] + heights[1] && !done[3]) {
      displayCreativeWorks();
      done[3] = true;
    }
    // Getting profile data on appropriate scrolling
    if (
      window.pageYOffset > heights[0] + heights[1] + heights[2] + heights[3] &&
      !done[4]
    ) {
      displayProfiles();
      done[4] = true;
    }
  };
};

lazyLoading();

// Contact data on footer
(async () => {
  const response = await (
    await fetch(`${url}/profile/contacts`, { method: 'GET' })
  ).json();

  for (let i = 0; i < response.data.length; i++) {
    const contact = `<p class="contact">
              <b class="contact-name">${response.data[i].name}: </b>
              <a href="tel:${response.data[i].contact}" class="no-deco">
                <span class="nunito"> ${response.data[i].contact}</span>
              </a>
            </p>`;

    $('.contacts').append(contact);
  }
})();
