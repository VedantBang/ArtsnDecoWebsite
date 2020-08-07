const deleteSelected = () => {
  document
    .getElementById('delete-selected-images')
    .addEventListener('mouseenter', () => {
      document.querySelector('.delete-warning-alert').style.visibility =
        'visible';
    });
  document
    .getElementById('delete-selected-images')
    .addEventListener('mouseleave', () => {
      document.querySelector('.delete-warning-alert').style.visibility =
        'hidden';
    });

  // Deleting selected images from DOM
  document
    .getElementById('delete-selected-images')
    .addEventListener('click', (e) => {
      e.preventDefault();
      [...document.querySelectorAll('input[type="checkbox"]')].filter(
        (checkbox) => {
          if (checkbox.checked) {
            checkbox.parentNode.parentNode.remove();
          }
        }
      );
    });
};
