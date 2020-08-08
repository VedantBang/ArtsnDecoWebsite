const spinner = (place) => {
  const spinner = document.createElement('i');
  spinner.classList.add('fas', 'fa-spinner', 'fa-spin', 'fa-3x');
  document.querySelector(`${place}`).appendChild(spinner);
};
