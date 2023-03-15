window.addEventListener('load', function() {


let trades = [];



function addTrade(coin, price, amount, date) {
  // Check that the amount and price are valid numbers


  if (isNaN(amount) || isNaN(price)) {
    alert('Please enter valid numbers for amount and price.');
    return;
  }

  let total = price * amount;

  let trade = {
    coin: coin,
    price: price,
    amount: amount,
    date: date,
    total: total
  };

  trades.push(trade);

  // Save trades to local storage
  localStorage.setItem('trades', JSON.stringify(trades));

  // Add the new trade to the table
  addTradeToTable(coin, price, amount, date);

  // Update the statistics
  updateStatistics();
}



function calculateTotalValue() {
  let rows = document.querySelectorAll('#trade-table tbody tr');
  let total = 0;
  
  // loop through each row in the table
  for (let i = 0; i < rows.length; i++) {
    let amountCell = rows[i].cells[1];
    let priceCell = rows[i].cells[2];
    
    console.log(amountCell, priceCell);
    
    // retrieve the amount and price values from the cells
    let amount = amountCell ? parseFloat(amountCell.textContent.replace(',', '')) || 0 : 0;
    let price = (priceCell && priceCell.textContent) ? parseFloat(priceCell.textContent.replace('$', '').replace(',', '')) : 0;
    
    // calculate the total for this row and add it to the overall total
    let rowTotal = amount * price;
    total += rowTotal;
  }
  
  // display the total
  document.getElementById('total').textContent = '$' + total.toFixed(2);
}




function calculateAveragePrice() {
  let rows = document.querySelectorAll('#trade-table tbody tr');
  let totalValue = 0;
  let totalAmount = 0;
  for (let row of rows) {
    let amount = parseFloat(row.querySelector('.amount').textContent.replace(',', ''));
    let price = parseFloat(row.querySelector('.price').textContent.replace('$', '').replace(',', ''));
    totalValue += amount * price;
    totalAmount += amount;
  }
  return totalValue / totalAmount;
}

function calculateTotalProfit() {
  let totalProfit = 0;
  for (let trade of trades) {
    let currentPrice = getPrice(trade.coin); // get the current price of the coin
    let currentValue = currentPrice * trade.amount; // calculate the current value of the trade
    let profit = currentValue - trade.total; // calculate the profit or loss
    totalProfit += profit; // add the profit/loss to the total
  }
  return totalProfit;
}

//function getPrice(coin) {
  // This is just a placeholder function that returns a random price between $0.01 and $10.00 for demonstration purposes
  //return Math.floor(Math.random() * 1000 + 1) / 100;
//}


function updateTable() {
  let table = document.querySelector('#trade-table tbody');

  // Get trades from local storage
  let tradesData = localStorage.getItem('trades');
  trades = tradesData ? JSON.parse(tradesData) : [];

  // Clear the table
  table.innerHTML = '';

  // Add table header
  let headerRow = table.insertRow();

  // Add trades to table
  trades.forEach(function(trade) {
    addTradeToTable(trade.coin, trade.price, trade.amount, trade.date);
  });
}


function updateStatistics() {
  try {
let totalValue = calculateTotalValue();
  let rows = document.querySelectorAll('#trade-table tbody tr');
  for (let row of rows) {
    let coin = row.querySelector('.coin').textContent;
    let amount = parseFloat(row.querySelector('.amount').textContent.replace(',', ''));
    let price = parseFloat(row.querySelector('.price').textContent.replace('$', '').replace(',', ''));
    let total = amount * price;
    row.querySelector('.total').textContent = '$' + total.toFixed(2);
  }
  document.querySelector('#total-value').textContent = '$' + totalValue.toFixed(2);} catch (error) {
    console.error('An error occured:', error);
  }
}



function addTradeToTable(coin, price, amount, date) {
  // Get a reference to the table body
  let table = document.querySelector('#trade-table tbody');

  if (!table) {
    console.error('Table element not found!');
    return;
  }

  // Create a new row
  let row = table.insertRow();

  // Add classes to the row for styling
  row.classList.add('trade');

  // Create cells for each piece of trade data
  let coinCell = row.insertCell();
  let priceCell = row.insertCell();
  let amountCell = row.insertCell();
  let totalCell = row.insertCell();
  let dateCell = row.insertCell();

  // Add classes to the cells for styling
  coinCell.classList.add('coin');
  priceCell.classList.add('price');
  amountCell.classList.add('amount');
  totalCell.classList.add('total');
  dateCell.classList.add('date');

  // Set the cell values
  coinCell.textContent = coin;
  priceCell.textContent = '$' + parseFloat(price).toFixed(2);
  amountCell.textContent = parseFloat(amount).toFixed(4);
  totalCell.textContent = '$' + parseFloat(price * amount).toFixed(2);
  dateCell.textContent = new Date(date).toLocaleDateString();

  // Add a tooltip to the date cell to show the full date on hover
  dateCell.setAttribute('title', new Date(date).toString());
}

function load() {
  // Get trades from local storage
  let tradesData = localStorage.getItem('trades');
  trades = tradesData ? JSON.parse(tradesData) : [];

  // Update table and statistics
  updateTable();
  updateStatistics();
}

// Call the load function when the page is loaded
window.addEventListener('load', load);


// Get the form element
const tradeForm = document.querySelector('#trade-form');

// Add an event listener for the form submission
tradeForm.addEventListener('submit', function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values from the form elements
  const coin = document.querySelector('#coin').value;
  const price = document.querySelector('#price').value;
  const amount = document.querySelector('#amount').value;
  const date = document.querySelector('#date').value;

  console.log('Coin:', coin);
  console.log('Price:', price);
  console.log('Amount:', amount);
  console.log('Date:', date);
  //console.log('Total Value:', totalValue);
  console.log('Average Price:', averagePrice);
  console.log('Total Profit:', totalProfit);
  console.log('Date:', date);
  console.log('ammountCell', amountCell);

  // Add the trade to the table
  addTradeToTable(coin, price, amount, date);

  // Clear the form inputs
  tradeForm.reset();
}


);
});