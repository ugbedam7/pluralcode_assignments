document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggle-button');
  const section3 = document.querySelector('.section3');
  const titleInput = document.querySelector('#title');
  const descriptionInput = document.querySelector('#description');
  const transactionTypeInput = document.querySelector('#transaction-type');
  const transactionDayInput = document.querySelector('#transaction-day');
  const amountInput = document.querySelector('#amount');
  const form = document.querySelector('.form');
  const transactionsContainer = document.querySelector('.transactions');
  const balanceElement = document.querySelector('.balance');
  const incomeElement = document.querySelector('.income');
  const expenseElement = document.querySelector('.expense');

  const svgIcon = `
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 352 512" 
        class="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
      </svg>`;

  let transArr = JSON.parse(localStorage.getItem('transactions')) || [];

  const toggleFormVisibility = () => {
    const isGreen = toggleButton.classList.contains('green');
    toggleButton.classList.toggle('green', !isGreen);
    toggleButton.classList.toggle('red', isGreen);
    section3.classList.toggle('hide', !isGreen);
    toggleButton.textContent = isGreen ? 'Close' : 'Open';
  };

  const formatDate = () => {
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const timeString = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    });

    return `${dateString} | ${timeString}`;
  };

  const updateTransanctions = () => {
    const savedTransactions =
      JSON.parse(localStorage.getItem('transactions')) || [];

    // Reset balance, income, and expense
    let income = 0;
    let expense = 0;
    let balance = 0;

    // Clear the container before appending
    transactionsContainer.innerHTML = '';

    // Update balance and render transactions
    if (savedTransactions.length === 0) {
      incomeElement.textContent = 0;
      expenseElement.textContent = 0;
      balanceElement.textContent = 0;
      transactionsContainer.innerHTML = `<p style="font-size: 20px">You have no transactions</p>`;
      return;
    }

    savedTransactions.forEach((trans) => {
      const { title, description, type, day, amount } = trans;
      const value = parseFloat(amount);
      if (type === 'Income') {
        income += value;
      } else {
        expense += value;
      }
      balance = income - expense;

      const card = createTransactionCard(title, description, type, day, amount);
      transactionsContainer.appendChild(card);
    });
    // Update the UI
    incomeElement.textContent = `+${income.toFixed(2)}`;
    expenseElement.textContent = `-${expense.toFixed(2)}`;
    balanceElement.textContent = balance.toFixed(2);
  };

  // const transArr = [];
  const saveTransaction = (title, description, type, day, amount) => {
    const transObj = {
      title,
      description,
      type,
      day,
      amount
    };

    const savedTransactions =
      JSON.parse(localStorage.getItem('transactions')) || [];

    savedTransactions.push(transObj);

    // transArr.push(transObj);
    console.log(savedTransactions);
    localStorage.setItem('transactions', JSON.stringify(savedTransactions));
    transArr = savedTransactions; // Sync transArr with localStorage
  };

  const createTransactionCard = (title, description, type, day, amount) => {
    const transactionCard = document.createElement('div');
    transactionCard.classList.add('transaction');

    const contentDiv = document.createElement('div');
    const deleteIcon = document.createElement('div');
    deleteIcon.classList.add('icon');
    deleteIcon.innerHTML = svgIcon;
    deleteIcon.addEventListener('click', () => {
      const index = transArr.findIndex(
        (t) => t.title === title && t.day === day
      );
      if (index > -1) transArr.splice(index, 1);
      localStorage.setItem('transactions', JSON.stringify(transArr));

      updateTransanctions();

      transactionCard.remove();
      console.log(transArr);
    });

    contentDiv.innerHTML = `
        <h3>${title}</h3>
        <p class="par">${description}</p>
        <small>Transaction amount: <span style="color: ${
          type === 'Income' ? 'green' : 'red'
        };">
          ${type === 'Income' ? '+' : '-'}₦${parseFloat(amount).toFixed(
      2
    )}</span></small>
        <small>Transaction type: ${type}</small>
        <small>Transaction day: ${day}</small>
        <small>Posted on ${formatDate()}</small>
      `;

    transactionCard.append(contentDiv, deleteIcon);
    return transactionCard;
  };

  const handleTransactionSubmit = (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const type = transactionTypeInput.value;
    const day = transactionDayInput.value;
    const amount = amountInput.value.trim();

    if (!title || !description || !amount || !type || !day) {
      alert('Please fill out all fields.');
      return;
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      alert('Please enter a valid positive number for the amount.');
      return;
    }

    saveTransaction(title, description, type, day, amount);
    updateTransanctions();

    form.reset();
  };

  // transArr.push(...savedTransactions);

  toggleButton.addEventListener('click', toggleFormVisibility);
  form.addEventListener('submit', handleTransactionSubmit);
  updateTransanctions();
});
