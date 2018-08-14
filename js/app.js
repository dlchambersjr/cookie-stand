'use strict';

// Global use variables
var allLoc = [], hoursOpen = [];//Arrays used globally
var start = 6, finish = 20; //Hours of operation in 24hr format

// Constructor fucntion called "Build" to create individual locations
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
var FirstAndPike = new Build('First and Pike', 23, 65, 6.3);
var seaTacAirport = new Build('SeaTac Airport', 3, 24, 1.2);
var seattleCenter = new Build('Seattel Center', 11, 38, 3.7);
var capitolHill = new Build('Capitol Hill', 20, 38, 2.3);
var alki = new Build ('Alki', 2, 16, 4.6);

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
    for (var p = 0; p < allLoc.length; p++) {
      // Customers per hour
      var min = Math.ceil(allLoc[p].minCust);
      var max = Math.floor(allLoc[p].maxCust);
      allLoc[p].CustPerHr.push(Math.floor(Math.random() * (max - min + 1)) + min);

      // Cookies Sold per hour
      allLoc[p].cookiesPerHr.push(Math.ceil(allLoc[p].CustPerHr[h] * allLoc[p].avgCookies));

      // Hourly, Daily and Grand Totals
      // allCookiesHr[h] = allCookiesHr[h] + allLoc[p].cookiesPerHr[h]; //Hourly all locations
      allLoc[p].totCookies += allLoc[p].cookiesPerHr[h]; //Daily per location
      // grandTotCookies = grandTotCookies + allLoc[p].totCookies; //grand total all location
      // console.log(grandTotCookies);
    }
  }
}

// create render routine to populate the table with location data
var salesTable = document.getElementById('salesDate');//identify the table to put data in.

Build.prototype.render = function(){

  //number of rows is based on number of locations
  var trEl, tdEl, thEl;
  for (var l = 0; d < allLoc.length; d++){
    trEl = document.createElement('tr'); //create the row
    thEl = document.createElement('th'); //create the first column with name
    thEl = document.textContent(allLoc[l].name);
    trEl = document.appendChild(thEl);

    for (var d = 0; d < allLoc[l].cookiesPerHr.length; l++){
      tdEl = document.createElement('th'); //create the first column with name
      tdEl = document.textContent(allLoc[l].name);
      trEl = document.appendChild(tdEl);
    }
    salesTable.document.appendChild(trEl);
  }

};


fillInfo(start, finish);

for (var r = 0; r < allLoc.length; r++) {
  allLoc[r].render();
}
