'use strict';

// Global variables
var allLoc = [], hoursOpen = [], hourTot = [];
var start = 6, finish = 20, hourlyLocTot = 0, grandTotal = 0;


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

// Populate Customers, cookies, and totals per hour data into the location
function fillInfo(f) {
  for (var h = 0; h < hoursOpen.length; h++) {
    hourTot[h] = 0; // establish begining cookies for each hour

    // Customers per hour
    var min = Math.ceil(allLoc[f].minCust);
    var max = Math.floor(allLoc[f].maxCust);
    allLoc[f].CustPerHr.push(Math.floor(Math.random() * (max - min + 1)) + min);

    // Cookies Sold per hour
    allLoc[f].cookiesPerHr.push(Math.ceil(allLoc[f].CustPerHr[h] * allLoc[f].avgCookies));

    // Hourly all locations
    allLoc[f].totCookies += allLoc[f].cookiesPerHr[h]; //Daily per location

  }
}
function getTotals() {
  grandTotal = 0;
  for (var h = 0; h < hoursOpen.length; h++) {
    hourTot[h] = 0;
    hourlyLocTot = 0;
    for (var f = 0; f < allLoc.length; f++) {
      hourlyLocTot += allLoc[f].cookiesPerHr[h]; // Total hourly
      grandTotal += allLoc[f].cookiesPerHr[h]; //grand total all locations
    }
    hourTot[h] += hourlyLocTot; //add to the array for the footer
  }
}

// Declare variables for rendering the table
var salesTable = document.getElementById('salesData');
var addForm = document.getElementById('newStoreForm');

// Render the Header
function createHeader() {
  // Create the first header column
  var trEl = document.createElement('tr'); //create the row
  var thEl = document.createElement('th'); //create the first column cell
  thEl.textContent = 'Location';
  trEl.appendChild(thEl);

  for (var t = 0; t < hoursOpen.length; t++){
    var tdEl = document.createElement('th'); //create a cell for each column of time
    tdEl.textContent = hoursOpen[t];
    trEl.appendChild(tdEl);
  }

  // Attach last header column
  thEl = document.createElement('th');
  thEl.textContent = 'Daily Total';
  trEl.appendChild(thEl);

  salesTable.appendChild(trEl);
}

// Render the main data of the table
Build.prototype.render = function(a){

  // Attach the location Name
  var trEl = document.createElement('tr'); //create the row
  var thEl = document.createElement('th'); //create the first column
  thEl.textContent = this.name;
  trEl.appendChild(thEl);
  console.log(trEl);

  for (var d = 0; d < allLoc[a].cookiesPerHr.length; d++){
    var tdEl = document.createElement('td'); //create a cell for each column of time
    tdEl.textContent = this.cookiesPerHr[d];
    trEl.appendChild(tdEl);
  }

  //Attach the location total for the day
  tdEl = document.createElement('td');
  tdEl.textContent = this.totCookies;
  trEl.appendChild(tdEl);

  salesTable.appendChild(trEl);
};

function createFooter() {
  var trEl = document.createElement('tr'); //create the row
  var thEl = document.createElement('th'); //create the first column cell
  thEl.textContent = 'TOTAL';
  trEl.appendChild(thEl);
  console.log(trEl);

  for (var t = 0; t < hoursOpen.length; t++){
    var tdEl = document.createElement('th'); //create a cell for each column of time
    tdEl.textContent = hourTot[t];
    trEl.appendChild(tdEl);
  }
  //Attach grand total to footer
  thEl = document.createElement('th');
  thEl.textContent = grandTotal;
  trEl.appendChild(thEl);

  salesTable.appendChild(trEl);
}

function renderAll() {
  for (var r = 0; r < allLoc.length; r++) {
    allLoc[r].render(r);
  }
}

// pre-loads the calculated info into the locations and renders the inital table
function initalBuild(){
  buildHours (start,finish);
  for (var f = 0; f < allLoc.length; f++) {
    fillInfo(f);
  }
  getTotals();
  createHeader();
  renderAll();
  createFooter();
}

initalBuild();

// Form Event Listeners
// Submit Button
addForm.addEventListener('submit',handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault(); //prevent reload

  var newName = event.target.newName.value;
  var newMin = parseInt(event.target.newMin.value);
  var newMax = parseInt(event.target.newMax.value);
  var newAvg = parseFloat(event.target.newAvg.value);

  new Build(newName,newMin, newMax, newAvg);

  var last = allLoc.length-1;

  fillInfo(last);

  salesTable.innerHTML = ''; //clear previous tables before rendering
  createHeader();
  renderAll();
  getTotals();
  createFooter();

  // Clear form values for next entry
  event.target.newName.value = null;
  event.target.newMin.value = null;
  event.target.newMax.value = null;
  event.target.newAvg.value = null;
}