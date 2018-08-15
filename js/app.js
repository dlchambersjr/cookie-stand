'use strict';

// Global variables
var allLoc = [], hoursOpen = [], dailyTot = [];
var start = 6, finish = 20, grandTotal = 0;

var salesTable = document.getElementById('salesData'); //identify the table to put data in.
var addForm = document.getElementById('newStoreForm');

//Hours of operation in 24hr format

// Constructor function called "Build" to create individual locations
function Build(name, minCust, maxCust, avgCookies) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookies = avgCookies;
  this.CustPerHr = [];
  this.cookiesPerHr = [];
  this.totCookies = 0;
  allLoc.push(this);
}

// Construct each location with known details
new Build('First and Pike', 23, 65, 6.3);
new Build('SeaTac Airport', 3, 24, 1.2);
new Build('Seattel Center', 11, 38, 3.7);
new Build('Capitol Hill', 20, 38, 2.3);
new Build ('Alki', 2, 16, 4.6);

// Fill in the additional required information
function fillInfo(open,closed) {
  for (var h = 0; h <= closed - open - 1; h++) {
    //Fill Hours Array - 24hr clock to determine am/pm
    if (h + open < 12) {
      hoursOpen.push(h + open + 'am');
    } else if (h + open === 12) {
      hoursOpen.push(h + open + 'pm');
    } else {
      hoursOpen.push((h + open - 12) + 'pm');
    }
    // Populate Customers, cookies, and totals per hour for each location
    dailyTot[h] = 0; // establish begining cookies for each hour

    for (var p = 0; p < allLoc.length; p++) {
      // Customers per hour
      var min = Math.ceil(allLoc[p].minCust);
      var max = Math.floor(allLoc[p].maxCust);
      allLoc[p].CustPerHr.push(Math.floor(Math.random() * (max - min + 1)) + min);

      // Cookies Sold per hour
      allLoc[p].cookiesPerHr.push(Math.ceil(allLoc[p].CustPerHr[h] * allLoc[p].avgCookies));

      // Hourly all locations
      allLoc[p].totCookies += allLoc[p].cookiesPerHr[h]; //Daily per location

      // Total daily location total
      dailyTot[h] += allLoc[p].cookiesPerHr[h];

      //grand total all locations will go here
      grandTotal += allLoc[p].cookiesPerHr[h];
    }
  }
}

// create render routine to populate the table with location data

Build.prototype.render = function(a){

  var trEl, tdEl, thEl;
  // Attache the location Name
  trEl = document.createElement('tr'); //create the row
  thEl = document.createElement('th'); //create the first column with name
  thEl.textContent = this.name;
  trEl.appendChild(thEl);

  for (var d = 0; d < allLoc[a].cookiesPerHr.length; d++){
    tdEl = document.createElement('td'); //create a cell for each column of time
    tdEl.textContent = this.cookiesPerHr[d];
    trEl.appendChild(tdEl);
  }

  //Attach the location total for the day
  tdEl = document.createElement('td');
  tdEl.textContent = this.totCookies;
  trEl.appendChild(tdEl);

  salesTable.appendChild(trEl);
};

function createHeader() {
  var trEl, tdEl, thEl;
  trEl = document.createElement('tr'); //create the row
  thEl = document.createElement('th'); //create the first column cell
  thEl.textContent = 'Location';
  trEl.appendChild(thEl);

  for (var t = 0; t < hoursOpen.length; t++){
    tdEl = document.createElement('th'); //create a cell for each column of time
    tdEl.textContent = hoursOpen[t];
    trEl.appendChild(tdEl);
  }

  //Attach daily total to header
  tdEl = document.createElement('td');
  tdEl.textContent = 'Daily Total';
  trEl.appendChild(tdEl);

  salesTable.appendChild(trEl);
}

function createFooter() {
  var trEl, tdEl, thEl;
  trEl = document.createElement('tr'); //create the row
  thEl = document.createElement('th'); //create the first column cell
  thEl.textContent = 'TOTAL';
  trEl.appendChild(thEl);

  for (var t = 0; t < hoursOpen.length; t++){
    tdEl = document.createElement('th'); //create a cell for each column of time
    tdEl.textContent = dailyTot[t];
    trEl.appendChild(tdEl);
  }
  //Attach grand total to footer
  tdEl = document.createElement('td');
  tdEl.textContent = grandTotal;
  trEl.appendChild(tdEl);

  salesTable.appendChild(trEl);
}

function renderAll() {
  for (var r = 0; r < allLoc.length; r++) {

    console.log(r);
    allLoc[r].render(r);
  }
}

fillInfo(start, finish); //should only run on the first load.

//++++++++ this is the process to build the table.  wrap this in a function

createHeader();
renderAll();
createFooter();

// +++++++++++++++++++++++++++
// Form work

// +++++custom validation message
// var email = document.getElementById("mail");

// email.addEventListener("input", function (event) {
//   if (email.validity.typeMismatch) {
//     email.setCustomValidity("I expect an e-mail, darling!");
//   } else {
//     email.setCustomValidity("");
//   }
// });

function handleFormSubmit(event) {
  console.log(event.target.newName.value);
  console.log(event.target.newMin.value);
  console.log(event.target.newMax.value);
  console.log(event.target.newAvg.value);

  event.preventDefault();

  var newName = event.target.newName.value;
  var newMin = event.target.newMin.value;
  var newMax = event.target.newMax.value;
  var newAvg = event.target.newAvg.value;

  new Build(newName,newMin, newMax,newAvg);
}

// Event Listeners
addForm.addEventListener('submit',handleFormSubmit);
