'use strict';

// Global variables
var allLoc = [], hoursOpen = [], dailyTot = [];
var start = 6, finish = 20, grandTotal = 0;
var salesTable = document.getElementById('salesData');
var addForm = document.getElementById('newStoreForm');

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

//Fill Hours Array - 24hr clock to determine am/pm
function buildHours(open, closed) {
  for (var h = 0; h <= closed - open - 1; h++) {
    if (h + open < 12) {
      hoursOpen.push(h + open + 'am');
    } else if (h + open === 12) {
      hoursOpen.push(h + open + 'pm');
    } else {
      hoursOpen.push((h + open - 12) + 'pm');
    }
  }
}

console.log(hoursOpen);

// Populate Customers, cookies, and totals per hour data into the location
function fillInfo(c) {
  for (var h = 0; h < hoursOpen.length; h++) {
    dailyTot[h] = 0; // establish begining cookies for each hour

    // Customers per hour
    var min = Math.ceil(allLoc[c].minCust);
    var max = Math.floor(allLoc[c].maxCust);
    allLoc[c].CustPerHr.push(Math.floor(Math.random() * (max - min + 1)) + min);

    // Cookies Sold per hour
    allLoc[c].cookiesPerHr.push(Math.ceil(allLoc[c].CustPerHr[h] * allLoc[c].avgCookies));

    // Hourly all locations
    allLoc[c].totCookies += allLoc[c].cookiesPerHr[h]; //Daily per location

    // Total daily location total
    dailyTot[h] += allLoc[c].cookiesPerHr[h];

    //grand total all locations will go here
    grandTotal += allLoc[c].cookiesPerHr[h];
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
  salesTable.innerHTML = '';
  for (var r = 0; r < allLoc.length; r++) {
    allLoc[r].render(r);
  }
}

// pre-loads the calculated info into the locations and renders the inital table
function initalBuild(){
  buildHours (start,finish);
  for (var f = 0; f < allLoc.length; f++) {
    console.log(f);
    fillInfo(f);
  }
  createHeader();
  renderAll();
  createFooter();
}

initalBuild();

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

// Submit Button Event Listner Process
addForm.addEventListener('submit',handleFormSubmit);

function handleFormSubmit(event) {
  // console.log(event.target.newName.value);
  // console.log(event.target.newMin.value);
  // console.log(event.target.newMax.value);
  // console.log(event.target.newAvg.value);

  event.preventDefault(); //prevent reload

  var newName = event.target.newName.value;
  var newMin = parseInt(event.target.newMin.value);
  var newMax = parseInt(event.target.newMax.value);
  var newAvg = parseInt(event.target.newAvg.value);

  new Build(newName,newMin, newMax,newAvg);

  var last = allLoc.length-1;

  fillInfo(last);

  renderAll();
  createFooter();

  // Clear form values for next entry
  event.target.newName.value = null;
  event.target.newMin.value = null;
  event.target.newMax.value = null;
  event.target.newAvg.value = null;
}






