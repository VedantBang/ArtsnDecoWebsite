// Declaring  section heights in an array
const heights = [
  document.querySelector('.hero-section').offsetHeight,
  document.querySelector('#about-us').offsetHeight,
  document.querySelector('#jumbotron-bg').offsetHeight,
  document.querySelector('#creativity').offsetHeight,
  document.querySelector('#team').offsetHeight,
  document.querySelector('.footer').offsetHeight,
];

// Boolean array
const done = [false, false, false, false, false, false];

// Page Visit to backend
fetch(`${url}/user/visit`);

// Changing webpage on scroll (lazy loading implementation)
window.onscroll = () => {
  // Change socials sidebar
  if (window.pageYOffset > 100) {
    document.querySelector('.socials-f').style.color = '#2a375e';
    document.querySelector('.socials-b').style.color = '#2a375e';
    document.querySelector('.socials-i').style.color = '#2a375e';
    document.querySelector('.socials-text').style.color = '#2a375e';
  } else {
    document.querySelector('.socials-f').style.color = '#fff';
    document.querySelector('.socials-b').style.color = '#fff';
    document.querySelector('.socials-i').style.color = '#fff';
    document.querySelector('.socials-text').style.color = '#fff';
  }
  // Hide socials sidebar
  if (
    window.pageYOffset >
    heights[0] + heights[1] + heights[2] + heights[3] + heights[4] + heights[5]
  ) {
    document.querySelector('.socials-sidebar').style.visibility = 'hidden';
  } else {
    document.querySelector('.socials-sidebar').style.visibility = 'visible';
  }
  // Getting stats on appropriate scrolling
  if (window.pageYOffset > heights[0] + heights[1] + heights[2] && !done[2]) {
    displayStats();
    done[2] = true;
  }
  if (
    window.pageYOffset > heights[0] + heights[1] + heights[2] + heights[3] &&
    !done[3]
  ) {
    // Getting creative works data on appropriate scrolling
    displayCreativeWorks();
    done[3] = true;
  }
  // Getting profile data on appropriate scrolling
  if (
    window.pageYOffset >
      heights[0] +
        heights[1] +
        heights[2] +
        heights[3] +
        heights[4] +
        heights[5] &&
    !done[4]
  ) {
    displayProfiles();
    done[4] = true;
  }
};
