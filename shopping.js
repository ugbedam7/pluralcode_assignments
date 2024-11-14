// Array to store the list of fruits
let fruits = [];

// Function to display the fruits
function displayFruits() {
  if (fruits.length > 0) {
    alert(fruits.join(', '));
  } else {
    alert('No fruits in the list.');
  }
}

// Welcome the user and ask if they wish to buy
function welcomeUser() {
  let response = prompt('Welcome, do you wish to buy from us today? (yes/no)');
  if (response === 'yes') {
    enterApplication();
  } else {
    alert('Thanks for visiting!');
    return;
  }
}

// Main application logic
function enterApplication() {
  while (true) {
    let action = prompt(
      "Do you wish to add, display, or quit? (type 'add', 'display', or 'quit')"
    );

    if (action === 'add') {
      let fruit = prompt('Enter a fruit you would like to add:');
      if (fruit) {
        fruits.push(fruit);
        alert(`${fruit} has been added to your list.`);
      } else {
        alert('No fruit entered.');
      }
    } else if (action === 'display') {
      displayFruits();
    } else if (action === 'quit') {
      alert('Thanks for shopping with us today!');
      break;
    } else {
      alert("Invalid option. Please type 'add', 'display', or 'quit'.");
    }
  }
}

// Start the script by welcoming the user
welcomeUser();
