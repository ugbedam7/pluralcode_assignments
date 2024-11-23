const toggleButton = document.getElementById('toggle-button');
const section3 = document.querySelector('.section3');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const amount = document.querySelector('#amount');
const transaction_type = document.querySelector('#transaction-type');
const transaction_day = document.querySelector('#transaction-day');
const form = document.querySelector('.form');
const transactions = document.querySelector('.transactions');

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

const date = new Date();
// Get date components
const options = {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric'
};
const dateString = date.toLocaleDateString('en-US', options);

// Get time components
const timeString = date.toLocaleTimeString('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true
});

// Combine date and time
const result = `${dateString} | ${timeString}`;

const svg = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 352 512" class="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>`;

function displayTransaction(e) {
  e.preventDefault();
  const outerDiv = document.createElement('div');
  const div = document.createElement('div');
  const h3 = document.createElement('h3');
  const h4 = document.createElement('h4');
  const p = document.createElement('p');
  const s1 = document.createElement('small');
  const s2 = document.createElement('small');
  const s3 = document.createElement('small');
  const s4 = document.createElement('small');

  h4.classList.add('icon');
  h4.innerHTML = svg;
  h4.addEventListener('click', () => {
    outerDiv.remove();
  });

  h3.textContent = title.value;
  p.classList.add('par');
  p.textContent = description.value;

  if (transaction_type.value == 'income') {
    s1.textContent = `Transaction amount: +₦${amount.value}`;
  } else {
    s1.textContent = `Transaction amount: -₦${amount.value}`;
  }

  s2.textContent = `Transaction type: ${transaction_type.value}`;
  s3.textContent = `Transaction day: ${transaction_day.value}`;
  s4.textContent = `Posted on ${result}`;

  div.appendChild(h3);
  div.appendChild(p);
  div.appendChild(s1);
  div.appendChild(s2);
  div.appendChild(s3);
  div.appendChild(s4);

  // Apply margin-bottom to all children
  // Array.from(div.children).forEach((child) => {
  //   child.style.display = 'block';
  //   child.style.marginBottom = '5px'; // Set desired margin
  // });

  outerDiv.classList.add('transaction');
  // div.classList.add('transaction-details');

  outerDiv.appendChild(div);
  outerDiv.appendChild(h4);
  transactions.appendChild(outerDiv);
  form.reset();
}

toggleButton.addEventListener('click', toggleForm);
form.addEventListener('submit', displayTransaction);
