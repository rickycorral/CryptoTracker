let trades = [];

function addTrade(coin, price, amount, date) {
  let total = price * amount; // calculate the total value for the trade

  let trade = {
    coin: coin,
    price: price,
    amount: amount,
    date: date,
    total: total // assign the total value to the trade object
  };

  trades.push(trade);

  updateTable();
  updateStatistics();
}

function calculateTotalValue() {
  let totalValue = 0;
  trades.forEach(function(trade) {
    totalValue += trade.total;
  });
  return totalValue;
}

function calculateAveragePrice() {
  let totalAmount = 0;
  let totalCost = 0;
  trades.forEach(function(trade) {
    totalAmount += trade.amount;
    totalCost += trade.price * trade.amount;
  });
  if (totalAmount === 0) {
    return 0;
  } else {
    return totalCost / totalAmount;
  }
}

function calculateTotalProfit() {
  let totalProfit = 0;
  trades.forEach(function(trade) {
    totalProfit += trade.total - trade.price * trade.amount;
  });
  return totalProfit;
}

function updateStatistics() {
  let totalValue = calculateTotalValue();
  let averagePrice = calculateAveragePrice();
  let totalProfit = calculateTotalProfit();
  let statisticsDiv = document.querySelector('#statistics');
  statisticsDiv.innerHTML = '';
  statisticsDiv.innerHTML += 'Total Value: ' + totalValue.toFixed(2) + '<br>';
  statisticsDiv.innerHTML += 'Average Price: ' + averagePrice.toFixed(2) + '<br>';
  statisticsDiv.innerHTML += 'Total Profit/Loss: ' + totalProfit.toFixed(2) + '<br>';
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

  // Add the trade to the table
  addTradeToTable(coin, price, amount, date);

  // Clear the form inputs
  tradeForm.reset();
});