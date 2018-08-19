'use strict';

// Global variables
var allStores = [], storeHours = [], openTime = 6, closedTime = 20;
var grandTotalallCookies, totalCookiesPerHour = []; //used 24hr time for easier calculations of am/pm


// Constructor function called "BuildStore" to create individual locations
function BuildStore(storeName, minimumCustomers, maximumCustomers, averageCookies) {
  this.storeName = storeName;
  this.minimumCustomers = minimumCustomers;
  this.maximumCustomers = maximumCustomers;
  this.averageCookies = averageCookies;
  this.CustPerHr = [];
  this.cookiesPerHr = [];
  this.totCookies = 0;
  allStores.push(this);
}

// Construct each location with known details
new BuildStore('First and Pike', 23, 65, 6.3);
new BuildStore('SeaTac Airport', 3, 24, 1.2);
new BuildStore('Seattel Center', 11, 38, 3.7);
new BuildStore('Capitol Hill', 20, 38, 2.3);
new BuildStore ('Alki', 2, 16, 4.6);

// Create an array for store hours
(function(open, closed) {
  for (var time = 0 + open; time <= closed - 1; time++) {
    if (time < 12) {
      storeHours.push(`${time}am`);
    } else if (time === 12) {
      storeHours.push(`${time}pm`);
    } else {
      storeHours.push(`${time - 12}pm`);
    }
  }
})(openTime,closedTime); // Runs without prompting

// Populate Customers, cookies, and totals per hour data into the location
function calculateStoreInfo(storeNumber) {
  for (var time = 0; time < storeHours.length; time++) {
    totalCookiesPerHour[time] = 0; // establish begining total

    // Customers per hour
    var min = Math.ceil(allStores[storeNumber].minimumCustomers);
    var max = Math.floor(allStores[storeNumber].maximumCustomers);
    allStores[storeNumber].CustPerHr.push(Math.floor(Math.random() * (max - min + 1)) + min);

    // Cookies Sold per hour
    allStores[storeNumber].cookiesPerHr.push(Math.ceil(allStores[storeNumber].CustPerHr[time] * allStores[storeNumber].averageCookies));

    // Hourly all locations
    allStores[storeNumber].totCookies += allStores[storeNumber].cookiesPerHr[time]; //Daily per location

  }
}
function getCookieTotals() {
  var hourlyStoreTotal = 0;
  grandTotalallCookies = 0;
  for (var time = 0; time < storeHours.length; time++) {
    totalCookiesPerHour[time] = 0;
    hourlyStoreTotal = 0;
    for (var storeNumber = 0; storeNumber < allStores.length; storeNumber++) {
      hourlyStoreTotal += allStores[storeNumber].cookiesPerHr[time]; // Total hourly
      grandTotalallCookies += allStores[storeNumber].cookiesPerHr[time]; //grand total all locations
    }
    totalCookiesPerHour[time] += hourlyStoreTotal; //add to the array for the footer
  }
}

// Declare variables for rendering the table
var salesTable = document.getElementById('salesData');
var addNewStoreForm = document.getElementById('addNewStoreForm');

// Render the Sales Table Header
function createSalesTableHeader() {
  // Create the first header column
  var trEl = document.createElement('tr'); //create the row
  var thEl = document.createElement('th'); //create the first column cell
  thEl.textContent = 'Location';
  trEl.appendChild(thEl);

  // Create the header body
  for (var t = 0; t < storeHours.length; t++){
    var tdEl = document.createElement('th'); //create a cell for each column of time
    tdEl.textContent = storeHours[t];
    trEl.appendChild(tdEl);
  }

  // Create last header column
  thEl = document.createElement('th');
  thEl.textContent = 'Daily Total';
  trEl.appendChild(thEl);

  salesTable.appendChild(trEl);
}

// Render the main data of the projected sales table
BuildStore.prototype.render = function(a){

  // Attach the location Name
  var trEl = document.createElement('tr'); //create the row
  var thEl = document.createElement('th'); //create the first column
  thEl.textContent = this.storeName;
  trEl.appendChild(thEl);
  console.log(trEl);

  for (var d = 0; d < allStores[a].cookiesPerHr.length; d++){
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

function createSalesTableFooter() {
  var trEl = document.createElement('tr'); //create the row
  var thEl = document.createElement('th'); //create the first column cell
  thEl.textContent = 'TOTAL';
  trEl.appendChild(thEl);
  console.log(trEl);

  for (var t = 0; t < storeHours.length; t++){
    var tdEl = document.createElement('th'); //create a cell for each column of time
    tdEl.textContent = totalCookiesPerHour[t];
    trEl.appendChild(tdEl);
  }
  //Attach grand total to footer
  thEl = document.createElement('th');
  thEl.textContent = grandTotalallCookies;
  trEl.appendChild(thEl);

  salesTable.appendChild(trEl);
}

function createSalesTableBody() {
  for (var storeNumber = 0; storeNumber < allStores.length; storeNumber++) {
    allStores[storeNumber].render(storeNumber);
  }
}

function createSalesTable() {
  salesTable.innerHTML = ''; //clear previous tables before rendering
  getCookieTotals();
  createSalesTableHeader();
  createSalesTableBody();
  createSalesTableFooter();
}

// pre-loads the calculated info into the allStores array and renders the inital table
// otherwise skips the pre-load and appends only the new store
var newStore = false;

function getMissingStoreData(){
  if (newStore === false) {
    for (var storeNumber = 0; storeNumber < allStores.length; storeNumber++) {
      calculateStoreInfo(storeNumber);
    }
    createSalesTable();
  } else createSalesTable();
}

getMissingStoreData();

// Form Event Listeners
// Submit Button
addNewStoreForm.addEventListener('submit',handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault(); //prevent reload

  var newStoreName = event.target.newStoreName.value;
  var newMinimumCustomers = parseInt(event.target.newMinimumCustomers.value);
  var newMaximumCustomers = parseInt(event.target.newMaximumCustomers.value);
  var newAverageCookies = parseFloat(event.target.newAverageCookies.value);

  new BuildStore(newStoreName,newMinimumCustomers, newMaximumCustomers, newAverageCookies);

  var newStoreNumber = allStores.length-1;

  newStore = true; // tells the builder not to reset the previous store data

  calculateStoreInfo(newStoreNumber);
  createSalesTable();

  // Clear form values for next entry
  event.target.newStoreName.value = null;
  event.target.newMinimumCustomers.value = null;
  event.target.newMaximumCustomers.value = null;
  event.target.newAverageCookies.value = null;
}