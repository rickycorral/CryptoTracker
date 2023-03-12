
var btc = document.getElementById("bitcoin");
var ltc = document.getElementById("litecoin");
var eth = document.getElementById("ethereum");
var doge = document.getElementById("dogecoin");

var liveprice = {
    "async": true,
    "scroosDomain": true,
    "url": "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Clitecoin%2Cethereum%2Cdogecoin&vs_currencies=usd",

    "method": "GET",
    "headers": {}
}

$.ajax(liveprice).done(function (response){
    btc.innerHTML = response.bitcoin.usd;
    ltc.innerHTML = response.litecoin.usd;
    eth.innerHTML = response.ethereum.usd;
    doge.innerHTML = response.dogecoin.usd;

});

$(document).ready(function() {
    // Add a new row to the trade table
    function addTradeToTable(date, details) {
      var newRow = "<tr><td>" + date + "</td><td>" + details + "</td></tr>";
      $("#trade-table tbody").append(newRow);
    }
  
    // Handle the click event of the Add Trade button
    $("#add-trade-btn").click(function() {
      var date = new Date().toLocaleString();
      var details = $("#trade-input").val();
      addTradeToTable(date, details);
      $("#trade-input").val(""); // Clear the input field
    });
  });
  