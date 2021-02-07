document.onreadystatechange = function () {
  if (document.readyState !== 'complete') {
    document.getElementById('myVideo').pause();
    document.querySelector('body').style.visibility = 'hidden';
    document.querySelector('.loader').style.visibility = 'visible';
  } else {
    document.getElementById('myVideo').play();
    document.querySelector('.loader').style.display = 'none';
    document.querySelector('body').style.visibility = 'visible';
  }
};
