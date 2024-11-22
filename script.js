const toggleButton = document.getElementById('toggle-button');
const section3 = document.querySelector('.section3');

function toggleForm() {
  if (toggleButton.classList.contains('green')) {
    section3.classList.remove('hide');
    toggleButton.classList.remove('green');
    toggleButton.classList.add('red');
    toggleButton.innerHTML = 'close';
  } else if (toggleButton.classList.contains('red')) {
    toggleButton.classList.remove('red');
    toggleButton.classList.add('green');
    section3.classList.add('hide');
    toggleButton.innerHTML = 'open';
  }
}

toggleButton.addEventListener('click', toggleForm);
